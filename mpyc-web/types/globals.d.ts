// import { PyWorker } from "@pyscript/core";

// declare module '@pyscript/core' {
//     export function PyWorker(file: string, options?: {
//         config?: string | object;
//         async?: boolean;
//         version: string;
//     }): Worker & {
//         sync: ProxyHandler<object> & any;
//     };
// }

declare global {
    // interface Document {
    //     clearTabCount: any;
    //     r: any;
    //     app: Controller
    //     run: any;
    //     runa: any;
    //     mpyc: MPyCManager;
    //     term: app.Term;
    //     editor: EditorView;
    //     ps: any;
    //     ps2: any;
    // }
    interface Worker {
        sync: ProxyHandler<object> & any;
    }
}



// declare module '@pyscript/core' {
//     export type WorkerOptions = {
//         /**
//          * the interpreter type to use
//          */
//         type: string;
//         /**
//          * the optional interpreter version to use
//          */
//         version?: string;
//         /**
//          * the optional config to use within such interpreter
//          */
//         config?: string;

//         async?: boolean;

//     };
//     // export const XWorker: typeof XWorker & { sync: any };
//     export const XWorker: (url: string, options?: WorkerOptions) => Worker & { sync: any };
//     export const PyWorker: (url: string, options?: WorkerOptions) => Worker & { sync: any };
//     // export function PyWorker(file: string, options?: {
//     //     config?: string | object;
//     //     async?: boolean;
//     // }): Worker & {
//     //     sync: ProxyHandler<any>;
//     // };
// }

// /**
//  * A `Worker` facade able to bootstrap on the worker thread only a PyScript module.
//  * @param {string} file the python file to run ina worker.
//  * @param {{config?: string | object, async?: boolean}} [options] optional configuration for the worker.
//  * @returns {Worker & {sync: ProxyHandler<object>}}
//  */

// import sync from "./sync.js";
// declare const exportedConfig: {};
// import hooks from "./hooks.js";
// export { exportedConfig as config, hooks };
