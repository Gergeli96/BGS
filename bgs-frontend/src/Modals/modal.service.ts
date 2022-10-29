import { IJsxElement } from "../types/general-types";
import { render } from 'solid-js/web';

export function openModal(modal: IJsxElement): void {
    render(modal as any, document.querySelector('#modal-anchor') as HTMLElement)
}
