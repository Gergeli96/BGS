import { navigate, navigateBack } from "../helpers/navigation-helper";
import { IJsxElement } from "../types/general-types";
import { WebshopCartIcon } from "./WebshopCartIcon";
import { useNavigate } from "@solidjs/router";
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
    const navigator = useNavigate()

    function toggleSmallView(): void {
        smallView?.classList.contains('open') ? smallView.classList.remove('open') : smallView?.classList.add('open')
    }

    return (<>
        <nav class="d-flex justify-between align-center">
            <div class="left-side d-flex align-center">
                <img class="cursor-pointer mr-4" src="/src/assets/bgs-transparent.png" alt="company logo" onClick={() => navigate(navigator, '/')} />

                <i class="bi bi-list cursor-pointer" onClick={toggleSmallView}></i>

                <div class="d-flex cursor-pointer ml-4" onClick={() => navigateBack(navigator)}>
                    <i class="bi bi-chevron-left white mr-1" style={{'font-size': '1.2rem'}}></i>
                    <div class="white" style={{'font-size': '1.2rem'}}>Vissza</div>
                </div>
            </div>

            <div class="nav-links d-flex align-center">
                <For each={props.links}>{x => 
                    <div class="nav-link" onClick={x.onclick}>{x.text}</div>
                }</For>
            </div>

            <div class="right-side">
                <WebshopCartIcon />
            </div>
        </nav>

        <div ref={smallView} class="small-window-links d-flex column pt-2">
            <For each={props.links}>{x => 
                <div class="nav-link" onClick={x.onclick}>{x.text}</div>
            }</For>
        </div>
    </>)
}
