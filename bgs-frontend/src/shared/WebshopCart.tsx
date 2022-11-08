import { IDetailedWebshopItem, IWebshopFile } from "../types/webshop-types";
import { navigate } from "../helpers/navigation-helper";
import { createSignal, For, onMount } from "solid-js";
import { IJsxElement } from "../types/general-types";
import { INavbarLink, Navbar } from "./Navbar";
import { useNavigate } from "@solidjs/router";
import { cart, setCart } from "../App";
import { Post } from "../helpers/http";
import { BitImage } from "./BitImage";
import './WebshopCart.scss';

export function WebshopCart(): IJsxElement {
    const [items, setItems] = createSignal<IDetailedWebshopItem[]>([])
    const [price, setPrice] = createSignal<number>(0)
    const links: INavbarLink[] = [
        {text: 'Kezdőlap', onclick: () => navigate(navigator, '/')},
        {text: 'Webshop', onclick: () => navigate(navigator, '/webshop')}
    ]
    const navigator = useNavigate()

    onMount(() => getItemsInCart())

    function getItemsInCart(): void {
        Post<IDetailedWebshopItem[]>('webshop/cartItems', {items: cart()})
            .then(response => {
                setItems(response)
                recalculatePrice()
            })
            .catch(error => { })
    }

    function getImage(files: IWebshopFile[]): string {
        return files?.length > 0 ? `http://drive.google.com/uc?export=view&id=${files[0].fileid}` : 'src/assets/image-not-found.png'
    }

    function recalculatePrice(): void {
        setPrice(items().reduce((value, item) => value += item.price, 0))
    }   

    function openItem(id: number): void {
        navigate(navigator, `/webshopitem/${id}`)
    }

    function removeItemFromCart(event: Event, id: number): void {
        event.stopPropagation(); event.preventDefault();
        setItems(items().filter(x => x.id != id))
        setCart(cart().filter(x => x != id))
        recalculatePrice()
    }

    return (
        <div class="webshop-cart-container">
            <Navbar links={links} />

            <div class="d-flex column page-content p-4">
                <div class="d-flex justify-end">
                    <button class="btn-success" disabled>Tovább a fizetéshez</button>
                </div>

                <div class="d-flex column justify-center pt-4">
                    <ul>
                        <For each={items()}>{x =>
                            <li class="d-flex justify-between cursor-pointer" onClick={() => openItem(x.id as number)}>
                                <div class="d-flex column info-container">
                                    <div class="d-flex">
                                        <h3>{x.name}</h3>
                                        <button class="btn-danger small ml-4" onClick={$event => removeItemFromCart($event, x.id as number)}>Eltávolítás a kosárból
                                            <i class="bi bi-cart-x-fill ml-2"></i>
                                        </button>
                                    </div>

                                    <p>{x.description}</p>
                                </div>

                                <div class="image-preview">
                                    <BitImage src={getImage(x.files)} />
                                </div>
                            </li>
                        }</For>
                    </ul>

                    <div class="d-flex column align-end pt-4">
                        <h3>Összesen:</h3>
                        <h4>{price()}<span class="pl-2">Ft</span></h4>
                    </div>
                </div>
            </div>
        </div>
    )
}
