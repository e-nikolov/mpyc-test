import { Controller, safe } from ".";

export function sendChatMessage(this: Controller) {
    let message = this.chatInput.value;
    this.chatInput.value = "";
    this.term.writeln(`Me: ${safe(message)}`);

    this.mpyc.broadcastMessage('chat', message)
}

export function processChatMessage(this: Controller, peerID: string, message: string) {
    this.term.writeln(`${safe(peerID)}: ${safe(message)}`);
}
