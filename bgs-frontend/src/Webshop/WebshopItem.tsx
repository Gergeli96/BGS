import { EmptyDetailedWebshopItem, IDetailedWebshopItem, IWebshopItemOverView } from "../types/webshop-types";
import { GaleryCarousel, GaleryCarouselImage, IGaleryCarouselImage } from "../shared/GaleryCarousel";
import { ConnectedWebshopItemPreview } from "./ConnectedWebshopItemPreview";
import { createSignal, For, onMount, Show } from "solid-js";
import { useNavigate, useParams } from "@solidjs/router";
import { navigate } from "../helpers/navigation-helper";
import { INavbarLink, Navbar } from "../shared/Navbar";
import { IJsxElement } from "../types/general-types";
import { PriceTag } from "../shared/Pricetag";
import { Stock } from "../shared/Stock";
import { cart, setCart } from "../App";
import { Get } from "../helpers/http";
import './WebshopItem.scss';

export function WebshopItem(): IJsxElement {
    const [item, setItem] = createSignal<IDetailedWebshopItem>(new EmptyDetailedWebshopItem())
    const [connecting, setConnecting] = createSignal<IDetailedWebshopItem[]>([])
    const [images, setImages] = createSignal<IGaleryCarouselImage[]>([])
    const links: INavbarLink[] = [
        {text: 'Kezdőlap', onclick: () => navigate(navigator, '/')},
        {text: 'Webshop', onclick: () => navigate(navigator, '/webshop')}
    ]
    const navigator = useNavigate()
    const params = useParams()

    onMount(() => getWebshopItem())

    function getWebshopItem(): void {
        Get<IWebshopItemOverView>(`webshopitems/overview/${params.id}`)
            .then(response => {
                setItem(response.item)
                let images = response.item.files.map(x => new GaleryCarouselImage(x.fileid))
                setImages(images)
                setConnecting(response.connecting)
            })
            .catch(error => { })
    }

    function addToCart(): void {
        setCart([...cart(), item().id as number])
    }

    return (<div class="webshop-item-page-container d-flex column">
        <Navbar links={links} />

        <div class="webshop-item-container d-flex justify-center">
            <div class="webshop-item d-grid p-4">
                <div class="carousel-container col-12">
                    <GaleryCarousel images={images()} />
                </div>

                <h3 class="col-12 pt-4">{item()?.name} <small class="ml-2">{item().design}</small></h3>

                <h4 class="col-12 pt-2"><PriceTag price={item().price} discount={item().discount} /></h4>

                <div class="col-12 pt-4">{item()?.description}</div>
                
                <div class="col-12 pt-4">
                    {/* <button class="btn-success" onClick={addToCart}><i class="bi bi-cart mr-1"></i>Kosárba</button> */}
                    <Stock itemId={item().id as number} stock={item()?.stock}/>
                </div>

                <Show when={connecting().length > 0}>
                    <h4 class="col-12 pt-4">Kapcsolódó termékek</h4>
                    <div class="col-12 pt-2">
                        <div class="d-flex wrap">
                            <For each={connecting()}>{x =>
                                <ConnectedWebshopItemPreview item={x} />
                            }</For>
                        </div>
                    </div>
                </Show>
            </div>
        </div>
    </div>)
}
