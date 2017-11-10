import * as phantom from 'phantom';
import { Crawler, Step, StepKind, ValueFrom } from '../../steps';

export class StepResolverFactory {
    create(kind: StepKind): StepResolver {
        switch (kind) {
            case StepKind.getValue:
                return this.getValue;
            case StepKind.setValue:
                return this.setValue;
            case StepKind.goBack:
                return this.goBack;
            case StepKind.goForward:
                return this.goForward;
            case StepKind.click:
                return this.click;
            default:
                throw new Error('Step kind not implemented');
        }
    }

    private async getValue(webPage: phantom.WebPage, selector?: string, valueFrom?: ValueFrom, valueToSet?: string): Promise<any> {
        return await webPage.evaluate((selector, valueFrom) => {
            const element = document.querySelector(selector);
            switch (valueFrom) {
                case 0:
                    return (<HTMLBodyElement>element).text;
                case 1:
                    return (<HTMLInputElement>element).value;
                case 2:
                    return (<HTMLImageElement>element).src;
                case 3:
                    return element.innerHTML;
                default:
                    return (<HTMLInputElement>element).value;
            }
        }, selector, valueFrom);
    }

    private async setValue(webPage: phantom.WebPage, selector?: string, valueFrom?: ValueFrom, valueToSet?: string): Promise<any> {
        return await webPage.evaluate((selector, valueFrom, valueToSet) => {
            const element = document.querySelector(selector);
            switch (valueFrom) {
                case 0:
                    (<HTMLBodyElement>element).text = valueToSet;
                    break;
                case 1:
                    (<HTMLInputElement>element).value = valueToSet;
                    break;
                case 2:
                    (<HTMLImageElement>element).src = valueToSet;
                    break;
                case 3:
                    element.innerHTML = valueToSet;
                    break;
                default:
                    (<HTMLInputElement>element).value = valueToSet;
                    break;
            }
        }, selector, valueFrom, valueToSet);
    }

    private async goBack(webPage: phantom.WebPage, selector?: string, valueFrom?: ValueFrom, valueToSet?: string): Promise<any> {
        return await webPage.evaluate(() => {
            window.history.back();
        });
    }

    private async goForward(webPage: phantom.WebPage, selector?: string, valueFrom?: ValueFrom, valueToSet?: string): Promise<any> {
        return await webPage.evaluate(() => {
            window.history.forward();
        });
    }

    private async click(webPage: phantom.WebPage, selector?: string, valueFrom?: ValueFrom, valueToSet?: string): Promise<any> {
        return await webPage.evaluate((selector) => {
            const element = <HTMLElement>document.querySelector(selector);
            element.click();
        }, selector);
    }
}

export type StepResolver = (webPage: phantom.WebPage, selector?: string, valueFrom?: ValueFrom, valueToSet?: string) => Promise<any>;
