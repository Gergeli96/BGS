import { IJsxElement } from "../types/general-types";
import { For, onMount, Show } from "solid-js";
import './ModalScaffold.scss'

export enum ModalSize {
    full = 'full',
    lg = 'lg',
    md = 'md',
    sm = 'sm'
}

export interface IModalScaffoldProps {
    buttons?: IModalButton[]
    children: IJsxElement
    size?: ModalSize
    name: string
}

export interface IModalButton {
    onclick: (closer: () => void) => void
    className: string
    name: string
}

export function ModalScaffold(props: IModalScaffoldProps): IJsxElement {
    let modalContainerElement: HTMLDivElement | undefined

    onMount(() => modalContainerElement?.querySelector('.modal-content')?.classList.add(props.size ?? ''))

    function close(): void {
        modalContainerElement?.remove()
    }

    return (
        <div class="modal-conatiner" ref={modalContainerElement}>
            <div class="modal-content-container" onClick={close}>
                <div class="modal-content d-flex column p-4">
                    <div class="modal-header d-flex justify-between align-center width-100 pb-4">
                        <h2>{props.name}</h2>
                        <i class="bi bi-x-circle cursor-pointrer" onClick={close}></i>
                    </div>

                    <div class="modal-body">
                        {props.children}
                    </div>

                    <Show when={(props.buttons?.length ?? 0) > 0}>
                        <div class="modal-footer d-flex justify-end pt-4">
                            <For each={props.buttons}>{x =>
                                <button class={x.className} onClick={() => x.onclick(close)}>{x.name}</button>
                            }</For>
                        </div>
                    </Show>
                </div>
            </div>
        </div>
    )
}
