import { MPyCManager } from '../mpyc';
import * as app from '.';
import { EditorView } from '@codemirror/view';
export * from './copy-btn';
export * from './term';
export * from './chat';
export * from './qr';
export * from './peers';
export * from './editor';
export * from './tabs';
import { ControllerOptions } from './elements';
export declare class Controller {
    mpyc: MPyCManager;
    editor: app.Editor;
    term: app.Term;
    demoSelect: HTMLSelectElement;
    hostPeerIDInput: HTMLInputElement;
    chatInput: HTMLInputElement;
    myPeerIDEl: HTMLInputElement;
    knownPeersEl: HTMLElement;
    resetPeerIDButton: HTMLButtonElement;
    runMPyCButton: HTMLButtonElement;
    runMPyCAsyncButton: HTMLButtonElement;
    stopMPyCButton: HTMLButtonElement;
    connectToPeerButton: HTMLButtonElement;
    sendMessageButton: HTMLButtonElement;
    clearTerminalButton: HTMLButtonElement;
    showQRCodeButton: HTMLButtonElement;
    scanQRInput: HTMLInputElement;
    constructor(mpyc: MPyCManager, opts: ControllerOptions);
    init(mpyc: MPyCManager, opts: ControllerOptions): void;
    pingWorker: () => void;
    setupMPyCEvents(mpyc: MPyCManager): void;
    setupButtonEvents(mpyc: MPyCManager, opts: ControllerOptions): void;
    setupGlobals(): void;
    setupDemoSelector: () => void;
    onPeerConnectedHook: (newPeerID: string) => void;
    onPeerDisconnectedHook: (disconnectedPeerID: string, mpyc: MPyCManager) => void;
    onPeerConnectionErrorHook: (peerID: string, err: Error, mpyc: MPyCManager) => void;
    processChatMessage: (peerID: string, message: string) => void;
    updatePeersDiv: (mpyc: MPyCManager) => void;
    updateHostPeerIDInput: () => string;
    sendChatMessage: () => void;
}
declare global {
    interface Document {
        clearTabCount: any;
        r: any;
        app: Controller;
        run: any;
        runa: any;
        mpyc: MPyCManager;
        term: app.Term;
        editor: EditorView;
        ps: any;
        ps2: any;
    }
    interface PerformanceEntry {
        type: string;
    }
}
