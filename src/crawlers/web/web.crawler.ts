import * as phantom from 'phantom';
import { ICrawler } from '../crawler.interface';
import { Crawler, Step, StepKind } from '../../steps';
import { StepResolverFactory } from './step-resolver.factory';

export class WebCrawler implements ICrawler {
    private webPage: phantom.WebPage;
    private instance: phantom.PhantomJS;
    private stepResolverFactory: StepResolverFactory;

    async crawl(crawlerInfo: Crawler): Promise<any[]> {
        this.stepResolverFactory = new StepResolverFactory();
        this.instance = await phantom.create(['--ignore-ssl-errors=yes', '--load-images=no']);
        try {
            this.webPage = await this.instance.createPage();
            await this.webPage.open(crawlerInfo.url);

            let results = [];

            for (let index = 0; index < crawlerInfo.steps.length; index++) {
                const step = crawlerInfo.steps[index];
                const result = await this.execute(step);
                results = results.concat(result);
            }

            return results;
        }
        finally {
            this.instance.exit();
        }
    }

    private async execute(step: Step): Promise<any[]> {
        let results = [];

        if (step.steps) {
            for (let index = 0; index < step.steps.length; index++) {
                const items = await this.execute(step.steps[index]);
                results = results.concat(items);
            }
        } else {
            const items = await this.executeSingle(step);
            results = results.concat(items);
        }

        if (step.recursive) {
            await this.webPage.evaluate(
                step.recursive.next.handler, step.recursive.next.args);

            const finished = await this.webPage.evaluate(
                step.recursive.stop.handler, step.recursive.stop.args);

            if (!finished) {
                results = results.concat(
                    await this.execute(step));
            }
        }

        return results;
    }

    private async executeSingle(step: Step): Promise<any[]> {
        let results = [];
        const resolver = this.stepResolverFactory.create(step.stepKind);
        const result = await resolver(this.webPage, step.selector, step.valueFrom, step.valueToSet);

        const mapping = new Object();
        mapping[step.fieldName] = result;
        results = results.concat(mapping);

        if (step.recursive) {
            await this.webPage.evaluate(
                step.recursive.next.handler, step.recursive.next.args);

            const finished = await this.webPage.evaluate(
                step.recursive.stop.handler, step.recursive.stop.args);

            if (!finished) {
                results = results.concat(
                    await this.executeSingle(step));
            }
        }

        return results;
    }
}
