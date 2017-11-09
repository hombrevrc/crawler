"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ValueFrom;
(function (ValueFrom) {
    ValueFrom[ValueFrom["text"] = 0] = "text";
    ValueFrom[ValueFrom["value"] = 1] = "value";
    ValueFrom[ValueFrom["src"] = 2] = "src";
})(ValueFrom = exports.ValueFrom || (exports.ValueFrom = {}));
var RecursiveStopKind;
(function (RecursiveStopKind) {
    RecursiveStopKind[RecursiveStopKind["selectorMissing"] = 0] = "selectorMissing";
    RecursiveStopKind[RecursiveStopKind["selectorAppear"] = 1] = "selectorAppear";
})(RecursiveStopKind = exports.RecursiveStopKind || (exports.RecursiveStopKind = {}));
var StepKind;
(function (StepKind) {
    StepKind[StepKind["setValue"] = 0] = "setValue";
    StepKind[StepKind["getValue"] = 1] = "getValue";
    StepKind[StepKind["goBack"] = 2] = "goBack";
    StepKind[StepKind["goAhead"] = 3] = "goAhead";
})(StepKind = exports.StepKind || (exports.StepKind = {}));
