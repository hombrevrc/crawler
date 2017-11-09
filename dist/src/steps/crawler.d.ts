export interface Crawler {
    url: string;
    steps: Step[];
    userAgent?: string;
}
export interface Step {
    steps?: Step[];
    selector: string;
    fieldName?: string;
    stepKind: StepKind;
    recursive?: Recursive;
    valueFrom?: ValueFrom;
    nextStepDelay?: number;
}
export interface Recursive {
    nextSelector: string;
    stopSelector: string;
    stopKind: RecursiveStopKind;
}
export declare enum ValueFrom {
    text = 0,
    value = 1,
    src = 2,
}
export declare enum RecursiveStopKind {
    selectorMissing = 0,
    selectorAppear = 1,
}
export declare enum StepKind {
    setValue = 0,
    getValue = 1,
    goBack = 2,
    goAhead = 3,
}
