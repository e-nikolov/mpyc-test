import chalk from "chalk";
import { Controller, safe } from ".";
import * as colors from "./colors";

export function sendChatMessage(this: Controller) {
    let message = this.chatInput.value;
    this.chatInput.value = "";
    this.term.writeln(`${chalk.green('Me')}: ${safe(message)}`);

    this.mpyc.broadcast('chat', message)
}

export function processChatMessage(this: Controller, peerID: string, message: string) {
    this.term.writeln(`${colors.peerID(safe(peerID))}: ${safe(message)}`);
}
