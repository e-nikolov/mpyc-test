
export const debounce = (fn: Function, ms = 100) => {
    let timeoutId: ReturnType<typeof setTimeout>;
    return function (this: any, ...args: any[]) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => fn.apply(this, args), ms);
    };
};

export const $ = <T extends HTMLElement>(selector: string, root = document): T => root.querySelector<T>(selector)!;
export const $$ = <T extends HTMLElement>(selector: string, root = document): T[] => [...root.querySelectorAll<T>(selector)];

export async function withTimeout<T>(promise: Promise<T>, ms: number = 1000, rejectValue: T | undefined = undefined): Promise<T | undefined> {
    return await Promise.race([promise, new Promise<T | undefined>(resolve => setTimeout(() => resolve(rejectValue), ms))]);
}

export function withTimeout2<T>(promise: Promise<T>, ms: number = 1000, rejectValue: T | undefined = undefined): Promise<T | undefined> {
    return Promise.race([promise, new Promise<T | undefined>(resolve => setTimeout(() => resolve(rejectValue), ms))]);
}
