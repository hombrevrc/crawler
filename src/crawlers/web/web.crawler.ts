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

            const results = [];

            for (let index = 0; index < crawlerInfo.steps.length; index++) {
                const step = crawlerInfo.steps[index];
                const results = await this.execute(step);

                results.concat(
                    results);
            }

            return results;
        }
        finally {
            this.instance.exit();
        }
    }

    async execute(step: Step): Promise<any[]> {
        const results = [];

        if (step.steps) {
            for (let index = 0; index < step.steps.length; index++) {
                results.concat(
                    await this.execute(step.steps[index]));
            }
        } else {
            results.concat(
                await this.executeSingle(step));
        }

        return results;
    }

    async executeSingle(step: Step): Promise<any[]> {
        const results = [];
        const resolver = this.stepResolverFactory.create(step.stepKind);
        const result = await resolver(this.webPage, step.selector, step.valueFrom, step.valueToSet);

        results.concat(result);

        if (step.recursive) {
            const finished = await this.webPage.evaluate(
                step.recursive.stop.handler, step.recursive.stop.args);

            if (!finished) {
                await this.webPage.evaluate(
                    step.recursive.next.handler, step.recursive.next.args);

                results.concat(
                    await this.executeSingle(step));
            }
        }

        return results;
    }
}