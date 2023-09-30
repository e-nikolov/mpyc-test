import { Terminal } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';
import { WebglAddon } from 'xterm-addon-webgl';
import { SearchAddon } from 'xterm-addon-search';
import { SearchBarAddon } from './xterm-addon-search-bar';
import { WebLinksAddon } from 'xterm-addon-web-links';
import { MPyCManager } from '../mpyc';
export declare class Term extends Terminal {
    fitAddon: FitAddon;
    searchAddon: SearchAddon;
    webglAddon: WebglAddon;
    searchBarAddon: SearchBarAddon;
    webLinksAddon: WebLinksAddon;
    mpyc: MPyCManager;
    constructor(sel: string, mpyc: MPyCManager);
    info(message: string): void;
    success(message: string): void;
    error(message: string): void;
    fit: () => void;
    updateColumnsEnv: () => void;
}
