
import pool from 'generic-pool'

export const debounce = (fn: Function, ms = 100) => {
    let timeoutId: ReturnType<typeof setTimeout>;
    return function (this: any, ...args: any[]) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => fn.apply(this, args), ms);
    };
};

export const $ = <T extends HTMLElement>(selector: string, root = document): T => root.querySelector<T>(selector)!;
export const $$ = <T extends HTMLElement>(selector: string, root = document): T[] => [...root.querySelectorAll<T>(selector)];

export async function withTimeout<T>(promise: Promise<T>, ms: number = 5000, rejectValue: T | undefined = undefined): Promise<T | undefined> {
    return await Promise.race([promise, new Promise<T | undefined>(resolve => setTimeout(() => resolve(rejectValue), ms))]);
}
let id = 0;
export function withTimeout2<T>(promise: Promise<T>, ms: number = 20000, rejectValue: T | undefined = undefined): Promise<T | undefined> {
    return new Promise((resolve, reject) => {
        let myId = id++;
        console.log(`withTimeout2(${myId})`)
        let t = setTimeout(() => {
            console.log(`withTimeout2: reject: ${myId}`);
            resolve(rejectValue)
        }, ms);

        promise.then((r) => {
            console.log(`withTimeout2: resolve: ${myId}: ${r}`);
            clearTimeout(t);
            resolve(r);
        }).catch(reject);

    });
}

// export function callSoon() {

// }
// export const channelPool = pool.createPool<MessageChannel>();
export const channelPool = pool.createPool(
    {
        create: async () => {
            return new MessageChannel();
        },
        destroy: async (channel) => {
            channel.port1.close();
            channel.port2.close();
        }
    },
    {
        max: 100,
        min: 30,
        //         // maxWaitingClients: 1000,
        //         // testOnBorrow: true,
        //         // testOnReturn: true,
        //         // acquireTimeoutMillis: 1000,
        //         // fifo: true,
        //         // priorityRange: 10,
        //         // autostart: true,
        //         // evictionRunIntervalMillis: 1000,
        //         // numTestsPerEvictionRun: 100,
        //         // softIdleTimeoutMillis: 1000,
        //         // idleTimeoutMillis: 1000,
    }
)

export function callSoon(callback: () => void, delay: number = 0) {
    if (delay == undefined || isNaN(delay) || delay < 0) {
        delay = 0;
    }
    if (delay < 1) {
        channelPool.acquire().then(channel => {
            channel.port1.onmessage = () => { channelPool.release(channel); callback() };
            channel.port2.postMessage('');
        });
    } else {
        setTimeout(callback, delay);
    }
}

export function withTimeout3<T>(promise: Promise<T>, ms: number = 20000, rejectValue: T | undefined = undefined): Promise<T | undefined> {
    let myId = id++;
    console.log(`withTimeout2(${myId})`)
    let t = new Promise<T | undefined>(resolve => setTimeout(() => { console.log(`withTimeout2: reject: ${myId}`); resolve(rejectValue) }, ms))

    return Promise.race([new Promise<T>((resolve, reject) => { promise.then((r) => { console.log(`withTimeout2: resolve: ${myId}: ${r}`); resolve(r); }).catch(reject) }), t]);
}
