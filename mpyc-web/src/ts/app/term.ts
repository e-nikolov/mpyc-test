
import { Terminal } from 'xterm';

import { FitAddon } from 'xterm-addon-fit';
import { WebglAddon } from 'xterm-addon-webgl';
import { SearchAddon } from 'xterm-addon-search';
import { SearchBarAddon } from 'xterm-addon-search-bar';

import { $, debounce } from './utils';
import chalk from 'chalk';

export class Term extends Terminal {
    fitAddon: FitAddon;
    searchAddon: SearchAddon;
    webglAddon: WebglAddon;
    searchBarAddon: SearchBarAddon;


    constructor(sel: string) {
        let el = $(sel);

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
        this.searchBarAddon = new SearchBarAddon({ searchAddon: this.searchAddon });
        this.loadAddon(this.fitAddon);
        this.loadAddon(this.searchAddon);
        this.loadAddon(this.searchBarAddon);
        this.loadAddon(this.webglAddon);

        this.open(el);
        this.attachCustomKeyEventHandler((e: KeyboardEvent) => {
            // console.log(e.key)
            if (e.ctrlKey && e.key == "c") {
                if (this.hasSelection()) {
                    navigator.clipboard.writeText(this.getSelection())
                    this.clearSelection();
                    return false
                }
            }
            if (e.ctrlKey && e.key == "f") {
                this.searchBarAddon.show();
                e.preventDefault();
                return false
            }
            return true;
        });

        document.addEventListener('keyup', (e: KeyboardEvent) => {
            if (e.key == "Escape") {
                this.searchBarAddon.hidden();
            }
        });

        // debounce resize
        let ro = new ResizeObserver(debounce(() => { this.fit(); }, 50));
        ro.observe(document.querySelector(".split-1")!)
    }


    info(message: string) {
        this.writeln(`  ℹ️  ${message}`);
    }

    success(message: string) {
        this.writeln(`  ${chalk.green("✔️")}  ${message}`);
    }

    error(message: string) {
        this.writeln(`  ${chalk.red("✖️")}\n  ${chalk.redBright(message)}`);
    }

    fit = () => {
        console.log("fitting terminal");
        this.fitAddon.fit();
    }
}