import { IJsxElement } from "../types/general-types";
import { WebshopCart } from "./WebshopCart";
import { For } from "solid-js";
import './Navbar.scss';

export interface INavbarLink {
    onclick: () => void
    text: string
}

export interface INavbarProps {
    links: INavbarLink[]
}

export function Navbar(props: INavbarProps): IJsxElement {
    let smallView: HTMLDivElement | undefined

    function toggleSmallView(): void {
        smallView?.classList.contains('open') ? smallView.classList.remove('open') : smallView?.classList.add('open')
    }

    return (<>
        <nav class="d-flex justify-between align-center">
            <div class="left-side d-flex align-center">
                <img class="mr-4" src="src/assets/bgs-transparent.png" alt="company logo" />

                <i class="bi bi-list cursor-pointer" onClick={toggleSmallView}></i>

                <div class="nav-links d-flex align-center">
                    <For each={props.links}>{x => 
                        <div class="nav-link" onClick={x.onclick}>{x.text}</div>
                    }</For>
                </div>
            </div>

            <div class="right-side">
                <WebshopCart />
            </div>
        </nav>

        <div ref={smallView} class="small-window-links d-flex column pt-2">
            <For each={props.links}>{x => 
                <div class="nav-link" onClick={x.onclick}>{x.text}</div>
            }</For>
        </div>
    </>)
}
