import { MPyCManager } from "../mpyc";
import * as ui from ".";

export function sendChatMessage(this: ui.Controller, mpyc: MPyCManager) {
    let message = this.chatInput.value;
    this.chatInput.value = "";
    this.term.writeln(`Me: ${ui.safe(message)}`);

    mpyc.broadcastMessage('chat', message)
}

export function processChatMessage(this: ui.Controller, peerID: string, message: string) {
    this.term.writeln(`${ui.safe(peerID)}: ${ui.safe(message)}`);
}
