export declare const debounce: (fn: Function, ms?: number) => (this: any, ...args: any[]) => void;
export declare const $: <T extends HTMLElement>(selector: string, root?: Document) => T;
export declare const $$: <T extends HTMLElement>(selector: string, root?: Document) => T[];
export declare function withTimeout<T>(promise: Promise<T>, ms?: number, rejectValue?: T | undefined): Promise<T | undefined>;
export declare function withTimeout2<T>(promise: Promise<T>, ms?: number, rejectValue?: T | undefined): Promise<T | undefined>;
export declare function withTimeout3<T>(promise: Promise<T>, ms?: number, rejectValue?: T | undefined): Promise<T | undefined>;
