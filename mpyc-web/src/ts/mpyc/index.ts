import { Peer, DataConnection } from "peerjs";

// import { PyWorker } from "https://cdn.jsdelivr.net/npm/@pyscript/core";
// import { PyWorker, hooks } from '@pyscript/core'
import { XWorker, Hook } from "polyscript";
import { EventEmitter } from 'eventemitter3'
import { MPyCEvents, PeerJSData } from './events.js'
import { callSoon, channelPool } from '../utils/index.js'


type ConnMap = Map<string, DataConnection>;

// hooks.onInterpreterReady.add((interpreter: any, x: any) => {
//     console.log("onInterpreterReady", interpreter, x)
// });

// hooks.onBeforeRun.add((interpreter: any, x: any) => {
//     console.log("onBeforeRun", interpreter, x)
// });
// hooks.onBeforeRunAsync.add((interpreter: any, x: any) => {
//     console.log("onBeforeRunAsync", interpreter, x)
// });
// hooks.onAfterRun.add((interpreter: any, x: any) => {
//     console.log("onAfterRun", interpreter, x)
// });
// hooks.onAfterRunAsync.add((interpreter: any, x: any) => {
//     console.log("onAfterRunAsync", interpreter, x)
// });

function MPyWorker(shimFilePath: string, configFilePath: string) {
    console.log("creating new worker")
    // return PyWorker(shimFilePath, { async: true, config: configFilePath });
    return XWorker(shimFilePath, { async: true, type: "pyodide", config: configFilePath })
}

type options = {
    peerID?: string
    shimFilePath: string
    configFilePath: string
    env?: { [key: string]: string }
}
export class MPyCManager extends EventEmitter<MPyCEvents> {
    peer: Peer;
    conns: ConnMap = new Map<string, DataConnection>();
    peerIDToPID: Map<string, number> = new Map<string, number>();
    pidToPeerID: Map<number, string> = new Map<number, string>();
    peersReady: Map<string, boolean> = new Map<string, boolean>();
    worker: ReturnType<typeof MPyWorker>;
    shimFilePath: string;
    configFilePath: string;
    workerReady = false;
    running = false;
    env: { [key: string]: string } = {}


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
            callSoon(() => { this.worker.sync.update_environ(this.env); });
        }
    }

    close() {
        console.log("destroying peer and worker");
        this.peer.destroy();
        this.worker.terminate();
        this.running = false;
    }

    runMPC = (code: string, is_async = false) => {
        this.running = true;
        let peers = this.getPeers(true)
        let pid = peers.findIndex((p) => p === this.peer.id)

        for (let i = 0; i < peers.length; i++) {
            this.peerIDToPID.set(peers[i], i)
            this.pidToPeerID.set(i, peers[i])
        }

        this.peersReady.set(this.peer.id, true);

        // callSoon(async () => {
        // await this.worker.sync.run_mpc({
        this.worker.sync.run_mpc({
            pid: pid,
            parties: peers,
            is_async: is_async,
            no_async: !is_async,
            code: code,
        })
        // })
        this.emit('worker:run', this);
    }

    newPeerJS(peerID: string | null): Peer {
        var peer: Peer;
        let opts: typeof peer.options = {
            // debug: 3,
            // secure: true,
            secure: true,
            host: "mpyc-demo--headscale-ams3-c99f82e5.demo.mpyc.tech",
            port: 443,

            // pingInterval: 2345,
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
        let worker = MPyWorker(shimFilePath, configFilePath);

        // allow the python worker to send PeerJS messages via the main thread

        worker.sync.sendReadyMessage = this.sendReadyMessage;
        worker.sync.sendRuntimeMessage = this.sendRuntimeMessage;
        worker.sync.getEnv = () => { return this.env; }
        // UI callbacks
        worker.sync.onWorkerReady = () => { this.workerReady = true; this.emit('worker:ready', this) };
        worker.sync.log = (...args: any) => {
            // callSoon(() => { console.log(...args) });
            console.log(...args);
        };
        worker.sync.logError = (...args: any) => {
            // callSoon(() => { console.error(...args) });
            console.error(...args);
        };

        worker.sync.logWarn = (...args: any) => {
            // callSoon(() => { console.warn(...args) });
            console.warn(...args);
        }
        worker.sync.display = (message: string) => {
            // callSoon(() => { this.emit('worker:display', message, this); })
            this.emit('worker:display', message, this);
        };
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
            this.emit('peerjs:conn:ready', conn.peer, this);
        });
        conn.on('error', (err: Error) => { this.emit('peerjs:conn:error', conn.peer, err, this) });
        conn.on('close', () => {
            this.conns.delete(conn.peer);
            this.emit('peerjs:conn:disconnected', conn.peer, this);
        });

        conn.on('data', (data: PeerJSData | unknown) => {
            let { type, payload } = data as PeerJSData;


            this.emit(`peerjs:conn:data:${type}`, conn.peer, payload)
        });
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
        // callSoon(() => {
        let peerID = this.pidToPeerID.get(pid);
        this.conns.get(peerID!)?.send({
            type: 'mpyc:ready',
            payload: message,
        })
        // })
    };

    // Called from the PeerJS connection
    processReadyMessage = (peerID: string, message: string) => {
        this.peersReady.set(peerID, true);

        if (!this.running) {
            console.log("ignoring mpc ready message because we are not running")
            return;
        }
        let pid = this.peerIDToPID.get(peerID)!;
        // callSoon(() => {
        this.worker.sync.on_ready_message(pid, message)
        // })
    }
    // i = 0;
    // Called from the Python worker
    sendRuntimeMessage = async (pid: number, message: any) => {
        // callSoon(() => {
        // this.i++
        // let i = this.i
        // console.warn(`sendRuntimeMessage ${i} 1`)

        // if (this.i > 5) {
        //     throw new Error("test")
        // }
        // console.warn(`sendRuntimeMessage ${i} 2`)
        // console.log(`sending data ${message}`)
        let peerID = this.pidToPeerID.get(pid)!;
        // console.warn(`sendRuntimeMessage ${i} 3`)

        this.conns.get(peerID)?.send({
            type: 'mpyc:runtime',
            payload: message,
        })
        // console.warn(`sendRuntimeMessage ${i} 99`)
        // })
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
        // callSoon(() => {
        this.worker.sync.on_runtime_message(pid, message)
        // })
    }
}

declare global {
    interface Worker {
        sync: any;
    }
}

// declare module '@pyscript/core' {
//     export class MPyCSync {
//         // * TypeScript
//         getEnv: () => { [key: string]: string };
//         sendReadyMessage: (pid: number, message: string) => void;
//         sendRuntimeMessage: (pid: number, message: string) => void;
//         onWorkerReady: () => void;
//         log: (...args: any[]) => void;
//         logError: (...args: any[]) => void;
//         logWarn: (...args: any[]) => void;
//         display: (message: string) => void;
//         mpcDone: () => void;
//         onerror: (err: ErrorEvent) => void;
//         onmessage: (e: MessageEvent) => void;
//         onmessageerror: (err: MessageEvent) => void;

//         // * Python
//         ping: () => Promise<boolean>;
//         // ping: () => boolean;
//         update_environ: (env: { [key: string]: string }) => void;
//         on_ready_message: (pid: number, message: string) => void;
//         on_runtime_message: (pid: number, message: string) => void;
//         run_mpc: (options: {
//             pid: number,
//             parties: string[],
//             is_async: boolean,
//             no_async: boolean,
//             code: string,
//         }) => void;
//     }

//     export function PyWorker(file: string, options?: {
//         config?: string | object;
//         async?: boolean;
//         version: string;
//     }): Worker & {
//         sync: ProxyHandler<object> & MPyCSync
//     }
// }