"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var crawler_kind_1 = require("./crawler-kind");
var CrawlerFactory = /** @class */ (function () {
    function CrawlerFactory() {
    }
    CrawlerFactory.prototype.create = function (kind) {
        switch (kind) {
            case crawler_kind_1.CrawlerKind.web:
                return undefined;
            default:
                var err = "Crawler " + kind + " not implemented";
                throw new Error(err);
        }
    };
    return CrawlerFactory;
}());
exports.CrawlerFactory = CrawlerFactory;
