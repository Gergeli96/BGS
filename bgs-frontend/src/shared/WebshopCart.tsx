import { IDetailedWebshopItem } from "../types/webshop-types";
import { IJsxElement } from "../types/general-types";
import { createSignal } from "solid-js";
import { Post } from "../helpers/http";
import { cart } from "../App";
import './WebshopCart.scss'

export function WebshopCart(): IJsxElement {
    const [items, setItems] = createSignal<IDetailedWebshopItem[]>([])

    function getItemsInCart(): void {
        Post<IDetailedWebshopItem[]>('', {items: cart()})
            .then(response => setItems(response))
            .catch(error => { })
    }

    return (
        <div class="webshop-cart-container p-4">
            <div class="d-flex justify-end">
                <button class="btn-success" disabled>Tovább a fizetéshez</button>
            </div>
        </div>
    )
}
