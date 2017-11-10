# crawler
A simple way to build web crawlers using PhantomJS.

## Configuring

You need configure your crawler. Follow the steps to do that:
* Set your initial URL
* Find your selector
* Choose the kind of your step (get value, set value, go back, go forward, click)
* Choose where you will get or set a value
* If your crawler is recursive, configure as below
* Set the name of the field that you are crawling (crawled values will return an object with field name + crawled value)

### Crawling a specific field

```
{
    url: 'https://github.com/raafvargas',
    steps: [
        {
            fieldName: 'image',
            stepKind: StepKind.getValue,
            selector: '.avatar',
            valueFrom: ValueFrom.src
        }
    ]
}
```

### Crawling a list of items (recursive)
```
{
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
}
```

### Crawling a list of items through pages
```
{
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
}
```

## Running

After configure, you just init your crawler.
Crawl method will return the crawled values.

```
const webCrawler = new crawlers.CrawlerFactory()
    .create(crawlers.CrawlerKind.web);
const result = await webCrawler.crawl(relatedRepositoriesCrawler);
```

## Important

PhantomJS must be installed and environment variable PHANTOM_PATH must be set.
[Here](http://phantomjs.org/download.html) you can find a tutorial about how to install PhantomJS.