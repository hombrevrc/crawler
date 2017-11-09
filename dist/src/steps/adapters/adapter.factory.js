"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var file_adapter_1 = require("./file.adapter");
var AdapterFactory = /** @class */ (function () {
    function AdapterFactory() {
    }
    AdapterFactory.prototype.create = function (type) {
        switch (type) {
            case 'from-file':
                return new file_adapter_1.FileAdapter();
            default:
                var err = "Adapter " + type + " not implemented";
                throw new Error(err);
        }
    };
    return AdapterFactory;
}());
exports.AdapterFactory = AdapterFactory;
