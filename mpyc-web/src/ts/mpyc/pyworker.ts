// import { Hook } from "../../../node_modules/polyscript/esm/worker/hooks.js";
// import { XWorker } from "../../../node_modules/polyscript/esm/index.js";
// import sync from "./sync";
// const { assign } = Object;

// import {
//     dedent,
//     // dispatch,
//     // unescape,
// } from "../../../node_modules/polyscript/esm/utils.js";

// import hooks from "./hooks";

// const workerHooks = {
//     codeBeforeRunWorker: () =>
//         [...hooks.codeBeforeRunWorker].map(dedent).join("\n"),
//     // [stdlib, ...hooks.codeBeforeRunWorker].map(dedent).join("\n"),
//     codeBeforeRunWorkerAsync: () =>
//         [...hooks.codeBeforeRunWorkerAsync].map(dedent).join("\n"),
//     // [stdlib, ...hooks.codeBeforeRunWorkerAsync].map(dedent).join("\n"),
//     codeAfterRunWorker: () =>
//         [...hooks.codeAfterRunWorker].map(dedent).join("\n"),
//     codeAfterRunWorkerAsync: () =>
//         [...hooks.codeAfterRunWorkerAsync].map(dedent).join("\n"),
// };

// /**
//  * A `Worker` facade able to bootstrap on the worker thread only a PyScript module.
//  * @param {string} file the python file to run ina worker.
//  * @param {{config?: string | object, async?: boolean}} [options] optional configuration for the worker.
//  * @returns {Worker & {sync: ProxyHandler<object>}}
//  */
// export function PyWorker(file: string, options: { config?: string | object, async?: boolean }): Worker & { sync: ProxyHandler<object>; } {
//     // this propagates pyscript worker hooks without needing a pyscript
//     // bootstrap + it passes arguments and enforces `pyodide`
//     // as the interpreter to use in the worker, as all hooks assume that
//     // and as `pyodide` is the only default interpreter that can deal with
//     // all the features we need to deliver pyscript out there.
//     const xworker = XWorker.call(new Hook(null, workerHooks), file, {
//         ...options,
//         type: "pyodide",
//     });
//     assign(xworker.sync, sync);
//     return xworker;
// }