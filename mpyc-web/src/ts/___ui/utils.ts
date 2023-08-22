
export const debounce = (fn: Function, ms = 100) => {
    let timeoutId: ReturnType<typeof setTimeout>;
    return function (this: any, ...args: any[]) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => fn.apply(this, args), ms);
    };
};

// function debounce2(func: () => void, timeout = 300) {
//     let timer: NodeJS.Timeout;
//     return function (...args: any) {
//         clearTimeout(timer);
//         timer = setTimeout(() => { func.apply(this, args); }, timeout);
//     };
// }
// function debounce3<
//     T extends unknown[]
// >(
//     func: (...args: T) => void,
//     delay: number,
// ):
//     (...args: T) => void {
//     let timer: NodeJS.Timeout;
//     return (...args: T) => {
//         if (timer) clearTimeout(timer);
//         timer = setTimeout(() => {
//             func.call(null, ...args);
//         }, delay);
//     };
// }
