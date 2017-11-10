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
    valueToSet?: string;
    recursive?: Recursive;
    valueFrom?: ValueFrom;
    nextStepDelay?: number;
}

export interface Recursive {
    next: { handler: (...args: any[]) => void, args: any[] };
    stop: { handler: (...args: any[]) => boolean, args: any[] };
}

export enum ValueFrom {
    text = 0,
    value = 1,
    src = 2,
    html = 3
}

export enum RecursiveStopKind {
    selectorMissing = 0,
    selectorAppear = 1
}

export enum StepKind {
    setValue = 0,
    getValue = 1,
    goBack = 2,
    goForward = 3,
    click = 4
}