import ansi from "ansi-colors";
declare namespace Colors {
    function peerID(text: string): string;
}
export declare const format: typeof ansi & typeof Colors;
export {};
