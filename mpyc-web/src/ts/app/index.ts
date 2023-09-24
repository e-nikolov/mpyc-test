import { MPyCManager } from '../mpyc';
import * as app from '.';
import { Tooltip } from 'bootstrap';
import { EditorView } from '@codemirror/view';

export * from './copy-btn';
export * from './term';
export * from './chat';
export * from './qr';
export * from './peers';
export * from './editor';
export * from './tabs';
import * as colors from "./colors";

import Split from 'split.js'
import { $, $$ } from './utils';
import { ControllerOptions } from './elements';

import chalk from 'chalk';

export class Controller {
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

    constructor(mpyc: MPyCManager, opts: ControllerOptions) {
        this.mpyc = mpyc;

        this.demoSelect = $<HTMLSelectElement>(opts.demoSelectSelector);
        this.hostPeerIDInput = $<HTMLInputElement>(opts.hostPeerIDInputSelector);
        this.chatInput = $<HTMLInputElement>(opts.chatInputSelector);
        this.myPeerIDEl = $<HTMLInputElement>(opts.myPeerIDSelector);
        this.knownPeersEl = $(opts.peersDivSelector);
        this.resetPeerIDButton = $<HTMLButtonElement>(opts.resetPeerIDButtonSelector);
        this.runMPyCButton = $<HTMLButtonElement>(opts.runMPyCButtonSelector);
        this.runMPyCAsyncButton = $<HTMLButtonElement>(opts.runMPyCAsyncButtonSelector);
        this.stopMPyCButton = $<HTMLButtonElement>(opts.stopMPyCButtonSelector);
        this.connectToPeerButton = $<HTMLButtonElement>(opts.connectToPeerButtonSelector);
        this.sendMessageButton = $<HTMLButtonElement>(opts.sendMessageButtonSelector);
        this.clearTerminalButton = $<HTMLButtonElement>(opts.clearTerminalButtonSelector);
        this.showQRCodeButton = $<HTMLButtonElement>(opts.showQRCodeButtonSelector);
        this.scanQRInput = $<HTMLInputElement>(opts.scanQRInputSelector);

        this.term = new app.Term(opts.terminalSelector);
        this.editor = new app.Editor(opts.editorSelector, this.demoSelect, mpyc);

        this.init(mpyc, opts);
    }

    init(mpyc: MPyCManager, opts: ControllerOptions) {
        this.term.info(`Initializing ${chalk.green('PeerJS')}...`);
        this.term.info(`Initializing ${chalk.green('PyScript runtime')}...`);

        this.updateHostPeerIDInput();

        this.setupMPyCEvents(mpyc);
        this.setupButtonEvents(mpyc, opts);
        this.setupDemoSelector();

        $$('[data-bs-toggle="tooltip"]').forEach(el => new Tooltip(el));

        Split(opts.splitPanelSelectors, {
            direction: 'vertical',
            gutterSize: 18,
        });

        this.setupGlobals();
    }

    setupMPyCEvents(mpyc: MPyCManager) {
        mpyc.on('peerjs:ready', (peerID: string) => {
            this.myPeerIDEl.value = app.safe(peerID);
            app.setTabState('myPeerID', peerID);

            console.log('My peer ID is: ' + peerID);
            this.term.success(`${chalk.green("PeerJS")} ready with ID: ${colors.peerID(peerID)}`);
            this.updatePeersDiv(mpyc);
        });
        mpyc.on('peerjs:closed', () => { this.term.error('PeerJS closed.'); });
        mpyc.on('peerjs:error', (err: Error) => { this.term.error('PeerJS failed: ' + err.message); });
        mpyc.on('peerjs:conn:ready', this.onPeerConnectedHook);
        mpyc.on('peerjs:conn:disconnected', this.onPeerDisconnectedHook);
        mpyc.on('peerjs:conn:error', this.onPeerConnectionErrorHook);
        mpyc.on('peerjs:conn:data:user:chat', this.processChatMessage);
        mpyc.on('worker:error', (err: Error) => { this.term.error(err.message); });
        mpyc.on('worker:run', (mpyc: MPyCManager) => { this.updatePeersDiv(mpyc); });
        mpyc.on('worker:display', (message: string) => { this.term.writeln(message); });
        mpyc.on('worker:display:raw', (message: string) => { this.term.write(message); });
        mpyc.on('worker:ready', () => { this.term.success(`${chalk.green("PyScript")} runtime ready.`); });
        mpyc.on('peerjs:conn:data:mpyc:ready', () => { this.updatePeersDiv(mpyc); });
    }

    setupButtonEvents(mpyc: MPyCManager, opts: ControllerOptions) {
        this.resetPeerIDButton.addEventListener('click', () => { delete sessionStorage.myPeerID; this.term.writeln("Restarting PeerJS..."); mpyc.resetPeer(""); });
        this.stopMPyCButton.addEventListener('click', () => { this.term.writeln("Restarting PyScript runtime..."); mpyc.resetWorker(); });
        this.runMPyCButton.addEventListener('click', () => { mpyc.runMPC(this.editor.getCode(), false); });
        this.runMPyCAsyncButton.addEventListener('click', () => mpyc.runMPC(this.editor.getCode(), true));
        this.connectToPeerButton.addEventListener('click', () => { localStorage.hostPeerID = this.hostPeerIDInput.value; mpyc.connectToPeer(this.hostPeerIDInput.value) });
        this.sendMessageButton.addEventListener('click', () => { this.sendChatMessage(); });
        this.clearTerminalButton.addEventListener('click', () => { this.term.clear(); });

        // CHAT
        this.chatInput.addEventListener('keypress', (e: Event) => {
            let ev = e as KeyboardEvent;

            if (ev.key === 'Enter' && !ev.shiftKey) {
                ev.preventDefault();
                return this.sendChatMessage();
            }
        });

        app.makeQRButton(opts.showQRCodeButtonSelector, () => { return this.myPeerIDEl.value });
        new app.CopyButton(opts.myPeerIDSelector, opts.copyPeerIDButtonSelector);
    }


    setupGlobals() {
        document.mpyc = this.mpyc;
        document.editor = this.editor;
        document.term = this.term;
        document.clearTabCount = () => { delete localStorage.tabCount }
        document.r = () => { this.mpyc.reset("") };
        document.run = async () => this.mpyc.runMPC(this.editor.getCode(), false);
        document.runa = async () => this.mpyc.runMPC(this.editor.getCode(), true);
    }

    public setupDemoSelector = app.setupDemoSelector.bind(this);
    public onPeerConnectedHook = app.onPeerConnectedHook.bind(this);
    public onPeerDisconnectedHook = app.onPeerDisconnectedHook.bind(this);
    public onPeerConnectionErrorHook = app.onPeerConnectionErrorHook.bind(this);
    public processChatMessage = app.processChatMessage.bind(this);
    public updatePeersDiv = app.updatePeersDiv.bind(this);
    public updateHostPeerIDInput = app.updateHostPeerIDInput.bind(this);
    public sendChatMessage = app.sendChatMessage.bind(this);
}

declare global {
    interface Document {
        clearTabCount: any;
        r: any;
        run: any;
        runa: any;
        mpyc: MPyCManager;
        term: app.Term;
        editor: EditorView;
    }
    interface PerformanceEntry {
        type: string;
    }
}
