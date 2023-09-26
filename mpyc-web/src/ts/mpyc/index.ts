import { Peer, DataConnection } from "peerjs";
import * as polyscript from "polyscript";
// import { Hook } from 'polyscript/hooks';
// import * as core from '@pyscript/core'


// console.log(core.PyWorker)
// console.log(Hook)


type ConnMap = Map<string, DataConnection>;

class Ev extends CustomEvent<{ args: any[] }> { }


// const { assign } = Object;
// 
// const workerHooks = {
//     onBeforeRun: (...a: any) => { console.log("onBeforeRun", a) },
//     onBeforeRunAsync: (...a: any) => { console.log("onBeforeRunAsync", a) },
//     codeBeforeRunWorker: (...a: any) => { console.log("codeBeforeRunWorker", a) },
//     codeBeforeRunWorkerAsync: (...a: any) => { console.log("codeBeforeRunWorkerAsync", a) },
//     onAfterRun: (...a: any) => { console.log("onAfterRun", a) },
//     afterRun: (...a: any) => { console.log("afterRun", a) },
//     onAfterRunAsync: (...a: any) => { console.log("onAfterRunAsync", a) },
//     afterRunAsync: (...a: any) => { console.log("afterRunAsync", a) },
//     codeAfterRunWorker: (...a: any) => { console.log("codeAfterRunWorker", a) },
//     codeAfterRunWorkerAsync: (...a: any) => { console.log("codeAfterRunWorkerAsync", a) },
//     onInterpreterReady: (...a: any) => { console.log("onInterpreterReady", a) },
//     interpreterReady: (...a: any) => { console.log("interpreterReady", a) },
//     onWorkerReady: (...a: any) => { console.log("onWorkerReady", a) },
// }

// /**
//  * A `Worker` facade able to bootstrap on the worker thread only a PyScript module.
//  * @param {string} file the python file to run ina worker.
//  * @param {{config?: string | object, async?: boolean}} [options] optional configuration for the worker.
//  * @returns {Worker & {sync: ProxyHandler<object>}}
//  */
// export function PyWorker(file: string, options: WorkerOptions & { async: boolean, config: string }): Worker & { sync: any; } {
//     // this propagates pyscript worker hooks without needing a pyscript
//     // bootstrap + it passes arguments and enforces `pyodide`
//     // as the interpreter to use in the worker, as all hooks assume that
//     // and as `pyodide` is the only default interpreter that can deal with
//     // all the features we need to deliver pyscript out there.
//     const xworker = XWorker.call(new Hook(null, workerHooks), file, {
//         ...options,
//         type: "pyodide",
//     });
//     assign(xworker.sync, {
//         /**
//          * 'Sleep' for the given number of seconds. Used to implement Python's time.sleep in Worker threads.
//          * @param {number} seconds The number of seconds to sleep.
//          */
//         sleep(seconds: number) {
//             return new Promise(($) => setTimeout($, seconds * 1000));
//         },
//     });
//     return xworker;
// }

export class MPyCManager extends EventTarget {
    peer: Peer;
    conns: ConnMap = new Map<string, DataConnection>();
    peerIDToPID: Map<string, number> = new Map<string, number>();
    pidToPeerID: Map<number, string> = new Map<number, string>();
    peersReady: Map<string, boolean> = new Map<string, boolean>();
    worker: Worker & { sync: any };
    shimFilePath: string;
    configFilePath: string;
    workerReady = false;
    running = false;
    env: any = {}


    constructor(peerID: string | null, shimFilePath: string, configFilePath: string, env: any = {}) {
        super();
        this.peer = this.newPeerJS(peerID);
        this.worker = this.newWorker(shimFilePath, configFilePath)
        this.shimFilePath = shimFilePath;
        this.configFilePath = configFilePath;

        this.on('peerjs:conn:data:peers', this.processNewPeers);
        this.on('peerjs:conn:data:mpyc:ready', this.processReadyMessage);
        this.on('peerjs:conn:data:mpyc:runtime', this.processRuntimeMessage);
        this.env = env;
    }

    public reset(peerID: string | null) {
        this.resetPeer(peerID);
        this.resetWorker();
    }

    resetPeer(peerID: string | null) {
        console.log("resetting peer");
        this.peerIDToPID = new Map<string, number>();
        this.peersReady = new Map<string, boolean>();
        this.pidToPeerID = new Map<number, string>();
        this.peer.destroy();
        this.peer = this.newPeerJS(peerID);
    }
    resetWorker() {
        console.log("resetting worker");
        this.worker.terminate();
        this.worker = this.newWorker(this.shimFilePath, this.configFilePath)
        this.running = false;
    }

    updateEnv(name: string, value: string) {
        this.env[name] = value;
        if (this.workerReady) {
            this.worker.sync.update_environ(this.env);
        }
    }

    close() {
        console.log("destroying peer and worker");
        this.peer.destroy();
        this.worker.terminate();
        this.running = false;
    }

    on(type: string, handler: (...args: any[]) => void) {
        this.addEventListener(type, (e: Event) => {
            let ev = e as Ev;
            // console.log("on", type, ...ev.detail.args.filter(a => !(a instanceof MPyCManager)));
            handler(...ev.detail.args)
        });
    }

    async emit(type: string, ...args: any[]) {
        if (type != "peerjs:conn:data:mpyc:runtime") {
            // console.log("emit", type, ...[...args].filter(a => !(a instanceof MPyCManager)))
        } else {
            // console.log("emit", type, ...[...args].filter(a => !(a instanceof MPyCManager)))
            // console.count("peerjs:conn:data:mpyc:runtime")
        }
        this.dispatchEvent(new Ev(type, { detail: { args } }));
    }

    runMPC = async (code: string, is_async = false) => {
        this.running = true;
        let peers = this.getPeers(true)
        let pid = peers.findIndex((p) => p === this.peer.id)

        console.log("peers:", peers)
        console.log("my id:", this.peer.id)
        console.log("my pid:", pid)

        for (let i = 0; i < peers.length; i++) {
            this.peerIDToPID.set(peers[i], i)
            this.pidToPeerID.set(i, peers[i])
        }

        this.peersReady.set(this.peer.id, true);


        this.worker.sync.run_mpc({
            pid: pid,
            parties: peers,
            is_async: is_async,
            no_async: !is_async,
            exec: code,
        })
        this.emit('worker:run', this);
    }

    newPeerJS(peerID: string | null): Peer {
        var peer: Peer;
        let opts: typeof peer.options = {
            // debug: 3,
            pingInterval: 2345,
        };

        if (peerID) {
            peer = new Peer(peerID, opts);
        } else {
            peer = new Peer(opts);
        }

        this.addPeerEventHandlers(peer)

        return peer;
    }

    newWorker(shimFilePath: string, configFilePath: string) {
        let worker = polyscript.XWorker(shimFilePath, { async: true, type: "pyodide", config: configFilePath });

        // let worker = XWorker.call(new Hook(null, workerHooks), shimFilePath, { async: true, type: "pyodide", config: configFilePath });
        // let worker = core.PyWorker(shimFilePath, { async: true, config: configFilePath });
        // let worker = PyWorker(shimFilePath, { async: true, config: configFilePath });
        // let worker = XWorker(shimFilePath, { async: true, type: "pyodide", config: configFilePath });

        // allow the python worker to send PeerJS messages via the main thread
        worker.sync.sendReadyMessage = this.sendReadyMessage;
        worker.sync.sendRuntimeMessage = this.sendRuntimeMessage;
        worker.sync.getEnv = () => { return this.env; }
        // UI callbacks
        worker.sync.onWorkerReady = () => { this.workerReady = true; this.emit('worker:ready', this) };
        worker.sync.log = console.log;
        worker.sync.logError = console.error;
        worker.sync.logWarn = console.warn;
        worker.sync.display = (message: string) => { this.emit('worker:display', message, this); }
        worker.onerror = (err: ErrorEvent) => { console.error(err.error); this.emit('worker:error', err, this) };
        worker.onmessage = (e: MessageEvent) => { console.info(e); this.emit('worker:message', e, this) };
        worker.onmessageerror = (err: MessageEvent) => { console.warn(err); this.emit('worker:messageerror', err, this) };
        worker.sync.mpcDone = () => { this.running = false; }

        return worker;
    }

    private addPeerEventHandlers(peer: Peer) {
        peer.on('open', (peerID) => { this.emit('peerjs:ready', peerID, this); });
        peer.on('error', (err) => { this.emit('peerjs:error', err, this); });
        peer.on('close', () => { this.emit('peerjs:closed', this); });
        peer.on('connection', (conn: DataConnection) => { this.addConnEventHandlers(conn); });
    }

    private addConnEventHandlers(conn: DataConnection) {
        console.log("new peer connection from", conn.peer)
        conn.on('open', () => {
            this.sendPeers(conn);
            this.conns.set(conn.peer, conn);
            this.emit("peerjs:conn:ready", conn.peer, this);
        });
        conn.on('error', (err) => { this.emit("peerjs:conn:error", conn.peer, err, this) });
        conn.on('close', () => {
            this.conns.delete(conn.peer);
            this.emit('peerjs:conn:disconnected', conn.peer, this);
        });

        conn.on('data', (data: any) => { this.emit(`peerjs:conn:data:${data.type}`, conn.peer, data.payload) });
    }

    send(conn: DataConnection, type: string, payload: any) {
        conn.send({ type, payload });
    }

    broadcast(type: string, payload: any) {
        this.conns.forEach(conn => {
            this.send(conn, `user:${type}`, payload);
        });
    }

    private sendPeers(conn: DataConnection) {
        this.send(conn, 'peers', this.getPeers())
    }

    // TODO formally prove that this always results in a full mesh
    private processNewPeers = (_: string, newPeers: string[]) => {
        newPeers.forEach(peerID => {
            if (!this.conns.get(peerID) && peerID != this.peer.id) {
                this.connectToPeer(peerID);
            }
        });
    }

    connectToPeer(peerID: string) {
        let conn = this.peer.connect(peerID, {
            reliable: true
        });

        this.addConnEventHandlers(conn);
    }

    getPeers(includeSelf = false) {
        let peers = Array.from(this.conns, ([_, conn]) => conn.peer);

        if (includeSelf) {
            peers.push(this.peer.id);
        }

        return peers.sort();
    }

    // Called from the Python worker
    sendReadyMessage = (pid: number, message: string) => {
        let peerID = this.pidToPeerID.get(pid);
        this.conns.get(peerID!)?.send({
            type: 'mpyc:ready',
            payload: message,
        })
    };

    // Called from the PeerJS connection
    processReadyMessage = (peerID: string, message: string) => {
        this.peersReady.set(peerID, true);

        if (!this.running) {
            console.log("ignoring mpc ready message because we are not running")
            return;
        }
        let pid = this.peerIDToPID.get(peerID)!;
        this.worker.sync.on_ready_message(pid, message)
    }

    // Called from the Python worker
    sendRuntimeMessage = (pid: number, message: any) => {
        // console.log(`sending data ${message}`)
        let peerID = this.pidToPeerID.get(pid)!;
        this.conns.get(peerID)?.send({
            type: 'mpyc:runtime',
            payload: message,
        })
    };

    // Called from the PeerJS connection
    processRuntimeMessage = (peerID: string, message: any) => {
        if (!this.running) {
            // ignore mpc messages if we're not running
            console.log("ignoring mpc runtime message because we are not running")
            return;
        }
        // console.log(`receiving data ${message}`)
        let pid = this.peerIDToPID.get(peerID)!;
        this.worker.sync.on_runtime_message(pid, message)
    }
}

