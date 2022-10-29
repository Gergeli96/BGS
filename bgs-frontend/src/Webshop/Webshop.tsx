import { IFurnitureCategory } from "../types/furniture-category-types";
import { IDetailedWebshopItem } from "../types/webshop-types";
import { createSignal, For, onMount, Show } from "solid-js";
import { WebshopItemPreview } from "./WebshopItemPreview";
import { navigate } from "../helpers/navigation-helper";
import { INavbarLink, Navbar } from "../shared/Navbar";
import { IJsxElement } from "../types/general-types";
import { useNavigate } from "@solidjs/router";
import { Get } from "../helpers/http";
import './Webshop.scss';

export function Webshop(): IJsxElement {
    const [categories, setCategories] = createSignal<IFurnitureCategory[]>([])
    const [items, setItems] = createSignal<IDetailedWebshopItem[]>([])
    let categoryListElement: HTMLUListElement | undefined
    const navigator = useNavigate()
    const navLinks: INavbarLink[] = [
        {text: 'Kezdőlap', onclick: () => navigate(navigator, '/')}
    ]

    onMount(() => {
        getCategories()
        getWebshopItems()
    })

    function getCategoryIdQuery(): string {
        const categryId = categoryListElement?.querySelector('.active')?.getAttribute('data-id') ?? null

        return categryId == null ? '' : `?groupid=${categryId}&t=${Date.parse(new Date() as any)}`
    }

    function changeActiveCategory(target: HTMLLIElement): void {
        const activeCategory = categoryListElement?.querySelector('.active')
        if (activeCategory != target) {
            activeCategory?.classList.remove('active')
            target.classList.add('active')

            getWebshopItems()
        }
    }

    function getCategories(): void {
        Get<IFurnitureCategory[]>('furniturecategories')
            .then(response => setCategories(response))
            .catch(error => { })
    }

    function getWebshopItems(): void {
        Get<IDetailedWebshopItem[]>(`webshopitems/detailedlist${getCategoryIdQuery()}`)
            .then(response => setItems(response))
            .catch(error => { })
    }

    return(
        <div class="webshop-page-container">
            <Navbar links={navLinks} />

            <div class="page-content d-flex">
                <div class="categories p-4">
                    <ul ref={categoryListElement}>
                        <li class="active cursor-pointer" onClick={e => changeActiveCategory(e.currentTarget)}>Összes</li>
                        <For each={categories()}>{x =>
                            <li class="cursor-pointer" data-id={x.id} onClick={e => changeActiveCategory(e.currentTarget)}>{x.name}</li>
                        }</For>
                    </ul>
                </div>

                <div class="items p-4 pl-unset">
                    <Show when={items().length == 0}>
                        <h3 class="text-center">Az adott kategoriában jelenleg nincsenek bútordarabok.</h3>
                    </Show>

                    <div class="d-grid g-gap-4">
                        <For each={items()}>{x =>
                            <div class="col-sm-12 col-md-6 col-lg-4">
                                <WebshopItemPreview item={x} />
                            </div>
                        }</For>
                    </div>
                </div>
            </div>
        </div>
    )
}
