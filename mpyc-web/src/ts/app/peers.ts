import { Controller } from ".";
import { MPyCManager } from "../mpyc";
import DOMPurify from "dompurify";

export function updateHostPeerIDInput(this: Controller): string {
    const urlParams = new URLSearchParams(window.location.search);
    const peer = urlParams.get('peer');
    var hostPeerID = peer || localStorage.hostPeerID;
    if (hostPeerID) {
        this.hostPeerIDInput.value = hostPeerID;
        localStorage.hostPeerID = hostPeerID;
    }

    return hostPeerID;
}

export function safe(text: string) {
    return DOMPurify.sanitize(text);
}

export function onPeerConnectedHook(this: Controller, newPeerID: string) {
    this.term.writeln(`Connected to: ${newPeerID}`);
    this.updatePeersDiv(this.mpyc);
}
export function onPeerConnectionErrorHook(this: Controller, peerID: string, err: Error, mpyc: MPyCManager) {
    this.term.writeln(`Failed to connect to: ${peerID}: ${err.message}`);
    this.updatePeersDiv(mpyc);
}

export function onPeerDisconnectedHook(this: Controller, disconnectedPeerID: string, mpyc: MPyCManager) {
    this.term.writeln(`Disconnected from: ${disconnectedPeerID}`);
    this.updatePeersDiv(mpyc);
}

export function updatePeersDiv(this: Controller, mpyc: MPyCManager) {
    this.knownPeersEl.innerHTML = "";
    mpyc.getPeers(true).forEach((p, pid) => {
        let icon = `
        <span class="position-relative end-0">
            <i class='bi ${mpyc.peersReady.get(p) ? 'bi-play-fill' : 'bi-pause-fill'}'></i>
        </span>`
        this.knownPeersEl.innerHTML += `
        <li class="list-group-item ${p == mpyc.peer.id ? '' : 'list-group-item-light'}"> 
            <span class="" style="user-select:none">${pid}: </span>
            <span class="d-inline-block text-truncate" style="vertical-align:top;max-width:200px;">${safe(p)}</span> 
            ${icon}
        </li>`;
    });
}
