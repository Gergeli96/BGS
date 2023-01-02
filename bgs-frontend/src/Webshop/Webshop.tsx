import { IFurnitureCategory } from "../types/furniture-category-types";
import { IDetailedWebshopItem } from "../types/webshop-types";
import { createSignal, For, onMount, Show } from "solid-js";
import { WebshopItemPreview } from "./WebshopItemPreview";
import { navigate } from "../helpers/navigation-helper";
import { INavbarLink, Navbar } from "../shared/Navbar";
import { IJsxElement } from "../types/general-types";
import { BitNumber } from "../helpers/number-helper";
import { useNavigate } from "@solidjs/router";
import { Get } from "../helpers/http";
import './Webshop.scss';

export function Webshop(): IJsxElement {
    const [categories, setCategories] = createSignal<IFurnitureCategory[]>([])
    const [items, setItems] = createSignal<IDetailedWebshopItem[]>([])
    const [categoryId, setCategoryId] = createSignal<number>(0)
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
        return categoryId() == null ? '' : `?categoryid=${categoryId()}&t=${Date.parse(new Date() as any)}`
    }

    function changeActiveCategory(categoryId: number): void {
        const target = categoryListElement?.querySelector(`li[data-id="${categoryId}"]`)
        const activeCategory = categoryListElement?.querySelector('.active')
        if (activeCategory != target) {
            activeCategory?.classList.remove('active')
            target?.classList.add('active')
            setCategoryId(categoryId)

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
                        <li class="active cursor-pointer" data-id="0" onClick={e => changeActiveCategory(0)}>Összes</li>
                        <For each={categories()}>{x =>
                            <li class="cursor-pointer" data-id={x.id} onClick={e => changeActiveCategory(x.id)}>{x.name}</li>
                        }</For>
                    </ul>

                    <select value={categoryId()} onChange={e => changeActiveCategory(BitNumber.parseInt(e.currentTarget.value) as number)}>
                        <option value="0">Összes</option>
                        <For each={categories()}>{x =>
                            <option value={x.id}>{x.name}</option>
                        }</For>
                    </select>
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
