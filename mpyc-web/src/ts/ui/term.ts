
import { FitAddon } from 'xterm-addon-fit';
// import { SearchAddon } from 'xterm-addon-search';

import { Terminal } from 'xterm';

export function makeTerminal(sel: string): Terminal {
    let term = new Terminal({
        // screenReaderMode: true,
        cols: 80,
        rows: 30,
        // allowProposedApi: true,
        cursorBlink: false,
        convertEol: true
    });
    const fitAddon = new FitAddon();
    // const searchAddon = new SearchAddon();
    term.loadAddon(fitAddon);
    // term.loadAddon(searchAddon);
    term.options.fontFamily = "MesloLGS NF, Hack, monospace";
    term.options.fontSize = 16;
    term.options.fontWeight = 500;
    term.options.theme = {
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

    term.open(document.querySelector(sel)!);
    term.onKey(({ key }) => {
        console.log(key)
        // put the keycode you copied from the console
        if (term.hasSelection() && key === "") {
            document.execCommand('copy')
        } else {
        }
    })
    window.addEventListener('resize', () => { fitAddon.fit() })
    document.term = term;
    return term
}
