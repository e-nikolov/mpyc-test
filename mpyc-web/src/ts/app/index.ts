import { MPyCManager } from '../mpyc';
import * as ui from '.';
import { Tooltip } from 'bootstrap';
import { EditorView } from '@codemirror/view';

export * from './copy-btn';
export * from './term';
export * from './chat';
export * from './qr';
export * from './peers';
export * from './editor';
import Split from 'split.js'

export class Controller {
    mpyc: MPyCManager;
    editor: ui.Editor;
    term: ui.Term;

    demoSelect = document.querySelector<HTMLSelectElement>('select#select-demo')!;
    hostPeerIDInput = document.querySelector<HTMLInputElement>('input#hostPeerID')!;
    chatInput = document.querySelector<HTMLInputElement>('#chatInput')!;
    myPeerIDEl = document.querySelector<HTMLInputElement>('#myPeerID')!;
    knownPeersEl = document.querySelector('#knownPeers')!;
    resetPeerIDButton = document.querySelector<HTMLButtonElement>('button#resetPeerID')!;
    runMPyCButton = document.querySelector<HTMLButtonElement>('button#startButton')!;
    runMPyCAsyncButton = document.querySelector<HTMLButtonElement>('button#startAsyncButton')!;
    stopMPyCButton = document.querySelector<HTMLButtonElement>('button#stopButton')!;
    connectToPeerButton = document.querySelector<HTMLButtonElement>('button#connect')!;
    sendMessageButton = document.querySelector<HTMLButtonElement>('#sendMessageButton')!;
    clearTerminalButton = document.querySelector<HTMLButtonElement>('button#clearTerminal')!;
    showQRCodeButton = document.querySelector<HTMLButtonElement>('#show-qr')!;
    scanQRInput = document.querySelector<HTMLInputElement>('#scan-qr')!;
    qrCanvas = document.querySelector<HTMLCanvasElement>('#qrr')!;
    qrCanvas2 = document.querySelector<HTMLCanvasElement>('#canvas')!;
    testDiv = document.querySelector<HTMLCanvasElement>('div#test')!;

    constructor(mpyc: MPyCManager) {
        this.term = new ui.Term('#terminal')

        this.term.writeln('Initializing UI...');
        this.term.writeln('Initializing PeerJS...');
        this.term.writeln('Initializing PyScript runtime...');
        this.mpyc = mpyc;

        for (let i = 0; i < 100; i++) {
            this.term.writeln(`${i}:\tlorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`);
        }

        mpyc.on('peerjs:ready', (peerID: string) => {
            this.myPeerIDEl.value = ui.safe(peerID);
            setTabState('myPeerID', peerID);

            console.log('My peer ID is: ' + peerID);
            this.term.writeln('PeerJS ready with ID: ' + peerID);
            this.updatePeersDiv(mpyc);
        });
        mpyc.on('peerjs:closed', () => { this.term.writeln('PeerJS closed.'); });
        mpyc.on('peerjs:error', (err: Error) => { this.term.writeln('PeerJS failed: ' + err.message); });
        mpyc.on('peerjs:conn:ready', ui.onPeerConnectedHook);
        mpyc.on('peerjs:conn:disconnected', ui.onPeerDisconnectedHook);
        mpyc.on('peerjs:conn:error', ui.onPeerConnectionErrorHook);
        mpyc.on('peerjs:conn:data:user:chat', ui.processChatMessage);
        mpyc.on('worker:error', (err: Error) => { this.term.writeln(err.message); });
        mpyc.on('worker:run', (mpyc: MPyCManager) => { this.updatePeersDiv(mpyc); });
        mpyc.on('worker:display', (message: string) => { this.term.writeln(message); });
        mpyc.on('worker:display:raw', (message: string) => { this.term.write(message); });
        mpyc.on('worker:ready', () => { this.term.writeln('PyScript runtime ready.'); });
        mpyc.on('peerjs:conn:data:mpyc:ready', () => { this.updatePeersDiv(mpyc); });

        this.resetPeerIDButton.addEventListener('click', () => { delete sessionStorage.myPeerID; this.term.writeln("Restarting PeerJS..."); mpyc.resetPeer(""); });
        this.stopMPyCButton.addEventListener('click', () => { this.term.writeln("Restarting PyScript runtime..."); mpyc.resetWorker(); });
        this.runMPyCButton.addEventListener('click', async () => { mpyc.runMPC(await this.editor.getCode(), false); });
        this.runMPyCAsyncButton.addEventListener('click', async () => mpyc.runMPC(await this.editor.getCode(), true));
        this.connectToPeerButton.addEventListener('click', () => { localStorage.hostPeerID = this.hostPeerIDInput.value; mpyc.connectToPeer(this.hostPeerIDInput.value) });
        this.sendMessageButton.addEventListener('click', () => { this.sendChatMessage(mpyc); });
        this.clearTerminalButton.addEventListener('click', () => { this.term.clear(); });
        this.updateHostPeerIDInput();

        new ui.CopyButton('#myPeerID', 'button#copyPeerID');


        this.chatInput.addEventListener('keypress', (e: Event) => {
            let ev = e as KeyboardEvent;

            if (ev.key === 'Enter' && !ev.shiftKey) {
                ev.preventDefault();
                return this.sendChatMessage(mpyc);
            }
        });

        document.querySelectorAll('[data-bs-toggle="tooltip"]').
            forEach(tooltipTriggerEl => new Tooltip(tooltipTriggerEl));

        this.demoSelect.selectedIndex = parseInt(localStorage.demoSelectorSelectedIndex) || 1;

        this.demoSelect.onchange = async () => {
            localStorage.demoSelectorSelectedIndex = this.demoSelect.selectedIndex;
            let demoCode = await this.fetchSelectedDemo();
            this.editor.updateCode(demoCode);
            this.editor.focus();
        }
        this.editor = new ui.Editor("#editor", this.demoSelect, mpyc)
        document.editor = this.editor;

        this.fetchSelectedDemo().then((code) => {
            this.editor.updateCode(code);
        });

        ui.makeQRButton('#show-qr', () => { return this.myPeerIDEl.value });

        document.mpyc = mpyc;
        document.clearTabCount = () => { delete localStorage.tabCount }
        document.r = () => { mpyc.reset("") };
        document.run = async () => mpyc.runMPC(await this.editor.getCode(), false);
        document.runa = async () => mpyc.runMPC(await this.editor.getCode(), true);

        this.resizeDemoSelector();
        window.addEventListener('resize', () => {
            this.resizeDemoSelector();
        })

        Split(['.split-0', '.split-1'], {
            direction: 'vertical',
            // minSize: 0,
            // gutterSize: 10,
        });
    }

    resizeDemoSelector() {
        this.demoSelect.size = window.innerHeight / (4 * 21)
    }

    async fetchSelectedDemo(): Promise<string> {
        var demoCode: string;
        if (this.demoSelect.selectedIndex == 0) {
            demoCode = localStorage.customCode || "";
        } else {
            demoCode = await fetchDemoCode(this.demoSelect.value);
        }
        return demoCode;
    }

    updatePeersDiv = ui.updatePeersDiv;
    updateHostPeerIDInput = ui.updateHostPeerIDInput;
    processChatMessage = ui.processChatMessage;
    sendChatMessage = ui.sendChatMessage;
}




export async function fetchDemoCode(src = "./py/main.py"): Promise<string> {
    let contents = await fetch(src)
    let pyCode = await contents.text()
    return pyCode;
}


// TODO: not thread safe, breaks if tabs open too quickly
export function loadPeerID(): string {
    localStorage.tabCount ||= 0;
    let tabCount = parseInt(localStorage.tabCount);
    localStorage.tabCount = tabCount + 1;

    addEventListener('beforeunload', function () {
        let tabCount = parseInt(localStorage.tabCount);
        if (tabCount > 0) {
            localStorage.tabCount = tabCount - 1;
        }
    });

    // Duplicated Tabs will have the same tabID and peerID as their parent Tab; we must force reset those values
    if (!sessionStorage.tabID || window.performance.getEntriesByType("navigation")[0].type == 'back_forward') {
        sessionStorage.tabID = localStorage.tabCount;
        sessionStorage.myPeerID = ui.getTabState("myPeerID");
    }

    console.log("tab id: " + sessionStorage.tabID);
    return sessionStorage.myPeerID;
}


export function getTabState(key: string) {
    let tabID = sessionStorage.tabID;
    return localStorage[`tabState:${tabID}:` + key] || "";
}

export function setTabState(key: string, value: any) {
    let tabID = sessionStorage.tabID;
    sessionStorage[key] = value;
    localStorage[`tabState:${tabID}:` + key] = value;
}

declare global {
    interface JQuery {
        resizableSafe: (obj: any) => void;
    }
    interface Document {
        clearTabCount: any;
        r: any;
        run: any;
        runa: any;
        mpyc: MPyCManager;
        term: ui.Term;
        editor: EditorView;
    }
    interface PerformanceEntry {
        type: string;
    }
}

export function ensureStorageSchema(gen: number) {
    console.log("Storage schema generation:", localStorage.gen)
    localStorage.gen ||= 0;
    if (localStorage.gen < gen) {
        console.log(`Clearing schema, latest generation: ${gen}`)
        localStorage.clear();
        sessionStorage.clear();
        localStorage.gen = gen;
    }
}
