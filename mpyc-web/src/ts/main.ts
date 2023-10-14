/*
 *  Copyright (c) 2015 The WebRTC project authors. All Rights Reserved.
 *
 *  Use of this source code is governed by a BSD-style license
 *  that can be found in the LICENSE file in the root of the source
 *  tree.
 */

'use strict';

import '../scss/style.scss';

import { MPyCManager } from './mpyc';

import * as app from './app';

app.ensureStorageSchema(18);
let peerID = app.loadPeerID();

let mpyc = new MPyCManager(peerID, "./py/shim.py", "config.toml", { COLUMNS: "110" });

new app.Controller(mpyc, {
    terminalSelector: '#terminal',
    editorSelector: '#editor',
    demoSelectSelector: 'select#select-demo',
    hostPeerIDInputSelector: 'input#hostPeerID',
    chatInputSelector: '#chatInput',
    myPeerIDSelector: '#myPeerID',
    peersDivSelector: '#knownPeers',
    copyPeerIDButtonSelector: 'button#copyPeerID',
    resetPeerIDButtonSelector: 'button#resetPeerID',
    runMPyCButtonSelector: 'button#startButton',
    runMPyCAsyncButtonSelector: 'button#startAsyncButton',
    stopMPyCButtonSelector: 'button#stopButton',
    connectToPeerButtonSelector: 'button#connect',
    sendMessageButtonSelector: '#sendMessageButton',
    clearTerminalButtonSelector: 'button#clearTerminal',
    showQRCodeButtonSelector: '#show-qr',
    scanQRInputSelector: '#scan-qr',
    splitPanelSelectors: ['.split-0', '.split-1'],
    versionSelector: "#version",
});
