import { CrawlerKind } from './crawler-kind';
import { ICrawler } from './crawler.interface';

export class CrawlerFactory {
    create(kind: CrawlerKind): ICrawler {
        switch (kind) {
            case CrawlerKind.web:
                return undefined;
            default:
                const err = `Crawler ${kind} not implemented`;
                throw new Error(err);
        }
    }
}
