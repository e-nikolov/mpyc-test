import { Tooltip } from 'bootstrap';
import { $ } from './utils';

// const <T extends HTMLElement>$ = (css: string, root = document) => root.querySelector<T>(css);

export class CopyButton {
    contentSelector: string;
    buttonSelector: string;
    contentEl: HTMLInputElement;
    buttonEl: HTMLButtonElement;

    constructor(contentSelector: string, buttonSelector: string) {
        this.contentSelector = contentSelector;
        this.buttonSelector = buttonSelector;
        this.contentEl = document.querySelector<HTMLInputElement>(contentSelector)!;
        this.buttonEl = document.querySelector<HTMLButtonElement>(buttonSelector)!;
        this.buttonEl.addEventListener("click", () => {
            navigator.clipboard.writeText(this.contentEl.value).then(() => {
                Tooltip.getInstance(this.buttonSelector)!.setContent({ '.tooltip-inner': "Copied!" })
                $(`${this.buttonSelector}.btn-primary`).style.display = "none";
                $(`${this.buttonSelector}.btn-success`).style.display = "";

                setTimeout(() => {
                    $(`${this.buttonSelector}.btn-primary`).style.display = "";
                    $(`${this.buttonSelector}.btn-success`).style.display = "none";

                    Tooltip.getInstance(this.buttonSelector)!.setContent({ '.tooltip-inner': "Copy to clipboard" })
                }, 2000);
            }, function (err) {
                console.error('Async: Could not copy text: ', err);
            });
        });
    }
}