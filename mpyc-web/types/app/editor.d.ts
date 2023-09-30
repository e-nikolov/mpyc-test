import { EditorView } from 'codemirror';
import { MPyCManager } from '../mpyc';
import { Controller } from '.';
export declare class Editor extends EditorView {
    constructor(selector: string, demoSelect: HTMLSelectElement, mpyc: MPyCManager);
    getCode(): string;
    updateCode(code: string): void;
}
export declare function setupDemoSelector(this: Controller): void;
export declare function fetchSelectedDemo(demoSelect: HTMLSelectElement): Promise<string>;
