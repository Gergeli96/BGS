import { activeUrl, navigate } from "../helpers/navigation-helper";
import { IJsxElement } from "../types/general-types";
import { useNavigate } from "@solidjs/router";
import { createEffect, For } from "solid-js";
import './AdminSidebar.scss'

export interface IAdminSidebarLink {
    name: string
    url: string
}

export function AdminSidebar(): IJsxElement {
    const links: IAdminSidebarLink[] = [
        {name: 'Webshop csoport', url: '/admin/webshopitemgroup'},
        {name: 'Webshop csoport elemek', url: '/admin/webshopitemgroups'},
        {name: 'Webshop elem', url: '/admin/webshopitem'},
        {name: 'Webshop elemek', url: '/admin/webshopitems'},
        {name: 'Webshop képek kezelése', url: '/admin/editimages'}
    ]
    let linksContainer: HTMLDivElement | undefined
    const navigator = useNavigate()

    createEffect(() => {
        let activeurl = activeUrl()
        linksContainer?.querySelector('.link.active')?.classList?.remove('active')
        linksContainer?.querySelector(`.link[data-url="${activeurl}"]`)?.classList?.add('active')
    })

    return (
        <div class="sidebar-container p-4">
            <div ref={linksContainer} class="links d-flex column">
                <For each={links}>{x =>
                    <a class="link cursor-pointer" data-url={x.url} onClick={() => navigate(navigator, x.url)}>{x.name}</a>
                }</For>
            </div>
        </div>
    )
}
