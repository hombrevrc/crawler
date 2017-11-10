import * as chai from 'chai';
import * as crawlers from '../../../src/crawlers';
import { Crawler, StepKind, ValueFrom } from '../../../src/steps';

describe('Web Crawler', () => {
    const webCrawler = new crawlers.CrawlerFactory()
        .create(crawlers.CrawlerKind.web);

    it('Get avatar', async () => {
        const avatarCrawler = <Crawler>{
            url: 'https://github.com/raafvargas',
            steps: [
                {
                    fieldName: 'image',
                    stepKind: StepKind.getValue,
                    selector: '.avatar',
                    valueFrom: ValueFrom.src
                }
            ]
        };
        const result = await webCrawler.crawl(avatarCrawler);
        chai.assert.isNotNull(result);
    }).timeout(Number.MAX_SAFE_INTEGER);

    it('Get pinned repositories', async () => {
        const pinnedRepositoriesCrawler = <Crawler>{
            url: 'https://github.com/raafvargas',
            steps: [
                {
                    fieldName: 'repositoryName',
                    stepKind: StepKind.getValue,
                    selector: '.repo',
                    valueFrom: ValueFrom.html,
                    recursive: {
                        next: {
                            handler: () => {
                                if (document.querySelectorAll('.repo')[0]) {
                                    document.querySelectorAll('.repo')[0].remove();
                                }
                            },
                            args: []
                        },
                        stop: {
                            handler: () => {
                                return document.querySelectorAll('.repo').length <= 0;
                            }
                        }
                    }
                }
            ]
        };
        const result = await webCrawler.crawl(pinnedRepositoriesCrawler);
        console.log(result);
        chai.assert.isNotNull(result);
    }).timeout(Number.MAX_SAFE_INTEGER);
});