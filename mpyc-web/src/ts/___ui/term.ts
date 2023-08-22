
import { Terminal } from 'xterm';

import { FitAddon } from 'xterm-addon-fit';
import { WebglAddon } from 'xterm-addon-webgl';
import { SearchAddon } from 'xterm-addon-search';

import { debounce } from './utils';

export class Term extends Terminal {
    fitAddon: FitAddon;
    searchAddon: SearchAddon;
    webglAddon: WebglAddon;


    constructor(sel: string) {
        super({
            screenReaderMode: true,
            cols: 80,
            // scrollOnUserInput: false,
            // rows: 15,
            allowProposedApi: true,
            // windowsMode: false,
            // scrollback: 0,
            cursorBlink: false,
            convertEol: true,
            fontFamily: "MesloLGS NF, Hack, monospace",
            fontSize: 16,
            fontWeight: 500,
            // macOptionClickForcesSelection: false,
            theme: {
                "black": "#000000",
                "red": "#c13900",
                "green": "#a4a900",
                "yellow": "#caaf00",
                "blue": "#bd6d00",
                "magenta": "#fc5e00",
                "cyan": "#f79500",
                "white": "#ffc88a",
                "brightBlack": "#6a4f2a",
                "brightRed": "#ff8c68",
                "brightGreen": "#f6ff40",
                "brightYellow": "#ffe36e",
                "brightBlue": "#ffbe55",
                "brightMagenta": "#fc874f",
                "brightCyan": "#c69752",
                "brightWhite": "#fafaff",
                "background": "#3a2f29",
                "foreground": "#ffcb83",
                "selectionBackground": "#c14020",
                "cursor": "#fc531d"
            }
        });
        this.fitAddon = new FitAddon();
        this.searchAddon = new SearchAddon();
        this.webglAddon = new WebglAddon();
        this.loadAddon(this.fitAddon);
        this.loadAddon(this.searchAddon);
        this.loadAddon(this.webglAddon);

        this.open(document.querySelector(sel)!);
        this.attachCustomKeyEventHandler((e: KeyboardEvent) => {
            if (e.ctrlKey && e.key == "c") {
                if (this.hasSelection()) {
                    navigator.clipboard.writeText(this.getSelection())
                    this.clearSelection();
                    return false
                }
            }
            return true;
        });

        // debounce resize
        let ro = new ResizeObserver(debounce(() => { this.fit(); }, 10));
        ro.observe(document.querySelector(".panel-top")!)
        // ro.observe(document.querySelector(".xterm")!)

        document.term = this;
    }

    fit = () => {
        console.log("fitting terminal");
        this.fitAddon.fit();
    }
}