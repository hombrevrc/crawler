import { CrawlerKind } from './crawler-kind';
import { ICrawler } from './crawler.interface';
export declare class CrawlerFactory {
    create(kind: CrawlerKind): ICrawler;
}
