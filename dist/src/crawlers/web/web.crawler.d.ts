import { Crawler } from '../../steps';
import { ICrawler } from '../crawler.interface';
export declare class WebCrawler implements ICrawler {
    crawl(steps: Crawler): any[];
}
