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
        chai.assert.isNotNull(result);
    }).timeout(Number.MAX_SAFE_INTEGER);

    it('Get packages related with crawlers', async () => {
        const relatedRepositoriesCrawler = <Crawler>{
            url: 'https://www.npmjs.com/search?q=crawler',
            steps: [
                {
                    steps: [
                        {
                            fieldName: 'packageName',
                            stepKind: StepKind.getValue,
                            selector: '.packageName',
                            valueFrom: ValueFrom.text,
                            recursive: {
                                next: {
                                    handler: () => {
                                        if (document.querySelectorAll('.packageName')[0]) {
                                            document.querySelectorAll('.packageName')[0].remove();
                                        }
                                    },
                                    args: []
                                },
                                stop: {
                                    handler: () => {
                                        return document.querySelectorAll('.packageName').length <= 0;
                                    }
                                }
                            }
                        }
                    ],
                    recursive: {
                        next: {
                            handler: () => {
                                const elements = document.querySelectorAll('.next');
                                if (elements.length == 1) {
                                    (<HTMLBodyElement>elements[0]).click();
                                } else {
                                    (<HTMLBodyElement>elements[1]).click();
                                }
                            },
                            args: []
                        },
                        stop: {
                            handler: () => {
                                return document.querySelector('.next') === null ? true : false;
                            }
                        }
                    }
                }
            ]
        };

        const result = await webCrawler.crawl(relatedRepositoriesCrawler);
        chai.assert.isNotNull(result);
    }).timeout(Number.MAX_SAFE_INTEGER);
});