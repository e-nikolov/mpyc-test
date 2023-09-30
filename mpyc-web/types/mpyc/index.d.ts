import { Peer, DataConnection } from "peerjs";
import { PyWorker } from '@pyscript/core';
import { EventEmitter } from 'eventemitter3';
import { MPyCEvents } from './events.js';
type ConnMap = Map<string, DataConnection>;
export declare class MPyCManager extends EventEmitter<MPyCEvents> {
    peer: Peer;
    conns: ConnMap;
    peerIDToPID: Map<string, number>;
    pidToPeerID: Map<number, string>;
    peersReady: Map<string, boolean>;
    worker: ReturnType<typeof PyWorker>;
    shimFilePath: string;
    configFilePath: string;
    workerReady: boolean;
    running: boolean;
    env: {
        [key: string]: string;
    };
    constructor(peerID: string | null, shimFilePath: string, configFilePath: string, env?: any);
    reset(peerID: string | null): void;
    resetPeer(peerID: string | null): void;
    resetWorker(): void;
    updateEnv(name: string, value: string): void;
    close(): void;
    runMPC: (code: string, is_async?: boolean) => void;
    newPeerJS(peerID: string | null): Peer;
    newWorker(shimFilePath: string, configFilePath: string): Worker & {
        sync: ProxyHandler<object> & import("@pyscript/core").MPyCWorker;
    };
    private addPeerEventHandlers;
    private addConnEventHandlers;
    send(conn: DataConnection, type: string, payload: any): void;
    broadcast(type: string, payload: any): void;
    private sendPeers;
    private processNewPeers;
    connectToPeer(peerID: string): void;
    getPeers(includeSelf?: boolean): string[];
    sendReadyMessage: (pid: number, message: string) => void;
    processReadyMessage: (peerID: string, message: string) => void;
    sendRuntimeMessage: (pid: number, message: any) => void;
    processRuntimeMessage: (peerID: string, message: any) => void;
}
declare module '@pyscript/core' {
    class MPyCWorker {
        getEnv: () => {
            [key: string]: string;
        };
        sendReadyMessage: (pid: number, message: string) => void;
        sendRuntimeMessage: (pid: number, message: string) => void;
        onWorkerReady: () => void;
        log: (...args: any[]) => void;
        logError: (...args: any[]) => void;
        logWarn: (...args: any[]) => void;
        display: (message: string) => void;
        mpcDone: () => void;
        onerror: (err: ErrorEvent) => void;
        onmessage: (e: MessageEvent) => void;
        onmessageerror: (err: MessageEvent) => void;
        ping: () => Promise<boolean>;
        update_environ: (env: {
            [key: string]: string;
        }) => void;
        on_ready_message: (pid: number, message: string) => void;
        on_runtime_message: (pid: number, message: string) => void;
        run_mpc: (options: {
            pid: number;
            parties: string[];
            is_async: boolean;
            no_async: boolean;
            exec: string;
        }) => void;
    }
    function PyWorker(file: string, options?: {
        config?: string | object;
        async?: boolean;
        version: string;
    }): Worker & {
        sync: ProxyHandler<object> & MPyCWorker;
    };
}
export {};
