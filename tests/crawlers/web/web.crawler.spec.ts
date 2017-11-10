import * as chai from 'chai';
import * as crawlers from '../../../src/crawlers';
import { Crawler, StepKind, ValueFrom } from '../../../src/steps';

describe('Web Crawler', () => {
    const webCrawler = new crawlers.CrawlerFactory()
        .create(crawlers.CrawlerKind.web);

    const crawlerInfo = <Crawler>{
        url: 'https://github.com/raafvargas',
        steps: [
            {
                fieldName: 'image',
                stepKind: StepKind.getValue,
                selector: '.avatar',
                valueFrom: ValueFrom.src
            },
            {
                fieldName: 'name',
                stepKind: StepKind.getValue,
                selector: '.p-name',
                valueFrom: ValueFrom.html
            }
        ]
    };

    it('Get avatar', async () => {
        const result = await webCrawler.crawl(crawlerInfo);
        console.log(result);
    }).timeout(Number.MAX_SAFE_INTEGER);
});