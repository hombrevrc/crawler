"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai = require("chai");
var steps_1 = require("../../../src/steps");
describe('FileAdapter', function () {
    var adapter = new steps_1.FileAdapter();
    it('File exists', function () {
        var filePath = '../../sources/from-file.json';
        chai.expect(adapter.transform()).to.not.throw;
    });
    it('File doesnt exists', function () {
        var filePath = '../../sources/file-not-exists.json';
        chai.expect(adapter.transform()).to.throw;
    });
});
