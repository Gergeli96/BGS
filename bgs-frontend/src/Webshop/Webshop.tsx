import { IFurnitureCategory } from "../types/furniture-category-types";
import { IDetailedWebshopItem } from "../types/webshop-types";
import { WebshopItemPreview } from "./WebshopItemPreview";
import { createSignal, For, onMount } from "solid-js";
import { IJsxElement } from "../types/general-types";
import { get } from "../helpers/http";
import './Webshop.scss';

export function Webshop(): IJsxElement {
    const [categories, setCategories] = createSignal<IFurnitureCategory[]>([])
    const [items, setItems] = createSignal<IDetailedWebshopItem[]>([])
    let categoryListElement: HTMLUListElement | undefined

    onMount(() => {
        getCategories()
        getWebshopItems()
    })

    function getCategoryIdQuery(): string {
        const categryId = categoryListElement?.querySelector('.active')?.getAttribute('data-id') ?? null

        return categryId == null ? '' : `?groupid=${categryId}`
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
        get<IFurnitureCategory[]>('furniturecategories')
            .then(response => setCategories(response))
            .catch(error => { })
    }

    function getWebshopItems(): void {
        get<IDetailedWebshopItem[]>(`webshopitems/detailed${getCategoryIdQuery()}`)
            .then(response => setItems(response))
            .catch(error => { })
    }

    return(
        <div class="webshop-page-container">
            <div class="d-flex max-size">
                <div class="categories p-2">
                    <ul ref={categoryListElement}>
                        <li class="active cursor-pointer" onClick={e => changeActiveCategory(e.currentTarget)}>Összes</li>
                        <For each={categories()}>{x =>
                            <li class="cursor-pointer" data-id={x.id} onClick={e => changeActiveCategory(e.currentTarget)}>{x.name}</li>
                        }</For>
                    </ul>
                </div>

                <div class="items">
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
