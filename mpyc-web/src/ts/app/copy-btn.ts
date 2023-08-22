import $ from 'jquery';
import { Tooltip } from 'bootstrap';

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
                $(`${this.buttonSelector}.btn-primary`).hide();
                $(`${this.buttonSelector}.btn-success`).show();

                setTimeout(() => {
                    $(`${this.buttonSelector}.btn-primary`).show();
                    $(`${this.buttonSelector}.btn-success`).hide();

                    Tooltip.getInstance(this.buttonSelector)!.setContent({ '.tooltip-inner': "Copy to clipboard" })
                }, 2000);
            }, function (err) {
                console.error('Async: Could not copy text: ', err);
            });
        });
    }
}