"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var FileAdapter = /** @class */ (function () {
    function FileAdapter() {
    }
    FileAdapter.prototype.transform = function () {
        var _this = this;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return new Promise(function (resolve, reject) {
            if (!args || !args[0]) {
                reject(new Error('File path is null'));
            }
            var filePath = args[0];
            var json = _this.internalRequire(filePath);
            if (!json) {
                reject(new Error('File doesnt exists'));
            }
            resolve(json);
        });
    };
    FileAdapter.prototype.internalRequire = function (filePath) {
        try {
            return require(filePath);
        }
        catch (err) {
            return undefined;
        }
    };
    return FileAdapter;
}());
exports.FileAdapter = FileAdapter;
