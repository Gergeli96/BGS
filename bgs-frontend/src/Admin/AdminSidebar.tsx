import { createEffect, createSignal, For, onMount } from "solid-js";
import { activeUrl, navigate } from "../helpers/navigation-helper";
import { BitAuth, useAuth } from "../Authentication/AuthProvider";
import { getImageLink } from "../helpers/drive-image-helper";
import { IJsxElement } from "../types/general-types";
import { useNavigate } from "@solidjs/router";
import './AdminSidebar.scss'

export interface IAdminSidebarLink {
    name: string
    url: string
}

export function AdminSidebar(): IJsxElement {
    const links: IAdminSidebarLink[] = [
        {name: 'Kezdőlap', url: '/'},
        {name: 'Galéria', url: '/admin/galerieform'},
        {name: 'Galéria törlés', url: '/admin/galeriedelete'},
        {name: 'Webshop csoport', url: '/admin/webshopitemgroup'},
        {name: 'Webshop csoport elemek', url: '/admin/webshopitemgroups'},
        {name: 'Webshop elem', url: '/admin/webshopitem'},
        {name: 'Webshop elemek', url: '/admin/webshopitems'},
        {name: 'Webshop képek kezelése', url: '/admin/editimages'},
        {name: 'Bútor kategória', url: '/admin/furniturecategory'}
    ]
    const [avatar, setAvatar] = createSignal<string>('')
    let linksContainer: HTMLDivElement | undefined
    let sidebarElement: HTMLDivElement | undefined
    const auth = useAuth() as BitAuth
    const navigator = useNavigate()

    onMount(() => {
        if (window.innerWidth < 700) sidebarElement?.classList.add('closed')
    })

    createEffect(() => {
        let activeurl = activeUrl()
        linksContainer?.querySelector('.link.active')?.classList?.remove('active')
        linksContainer?.querySelector(`.link[data-url="${activeurl}"]`)?.classList?.add('active')
    })

    createEffect(() => {
        setAvatar(getImageLink(auth.user()?.avatar as string, 'https://cdn-icons-png.flaticon.com/512/18/18601.png'))
    })

    function toggle(): void {
        if (sidebarElement?.classList.contains('closed')) {
            sidebarElement?.classList.remove('closed')
            sidebarElement?.classList.add('opened')
        }
        else {
            sidebarElement?.classList.remove('opened')
            sidebarElement?.classList.add('closed')
        }
    }

    function logOut(): void {
        auth.logOut()
        navigate(navigator, '/')
    }

    return (
        <div ref={sidebarElement} class="sidebar-container p-4">
            <div class="user-data d-flex align-center mb-4">
                <img class="pr-4" src={avatar()} alt="avatar" />

                <div class="d-flex justify-between align-center width-100">
                    <h3>{auth.user().username}</h3>

                    <div class="d-flex justify-end">
                        <i class="bi bi-box-arrow-right cursor-pointer pr-2" onClick={logOut}></i>
                        <i class="bi bi-gear cursor-pointer" onClick={() => navigate(navigator, '/admin/editaccount')}></i>
                    </div>
                </div>
            </div>

            <div class="pt-2 pb-3">
                <i class="bi bi-arrow-left cursor-pointer" onClick={toggle}></i>
            </div>

            <div ref={linksContainer} class="links d-flex column">
                <For each={links}>{x =>
                    <a class="link cursor-pointer" data-url={x.url} onClick={() => navigate(navigator, x.url)}>{x.name}</a>
                }</For>
            </div>
        </div>
    )
}
