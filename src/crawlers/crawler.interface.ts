import { Crawler } from '../steps';

export interface ICrawler {
    crawl(steps: Crawler): Promise<Array<any>>;
}
