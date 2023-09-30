import { Controller } from ".";
import { MPyCManager } from "../mpyc";
export declare function updateHostPeerIDInput(this: Controller): string;
export declare function safe(text: string): string;
export declare function onPeerConnectedHook(this: Controller, newPeerID: string): void;
export declare function onPeerConnectionErrorHook(this: Controller, peerID: string, err: Error, mpyc: MPyCManager): void;
export declare function onPeerDisconnectedHook(this: Controller, disconnectedPeerID: string, mpyc: MPyCManager): void;
export declare function updatePeersDiv(this: Controller, mpyc: MPyCManager): void;
