import { EmptyDetailedWebshopItem, IDetailedWebshopItem, IWebshopItemOverView } from "../types/webshop-types";
import { GaleryCarousel, GaleryCarouselImage, IGaleryCarouselImage } from "../shared/GaleryCarousel";
import { ConnectedWebshopItemPreview } from "./ConnectedWebshopItemPreview";
import { createSignal, For, onMount, Show } from "solid-js";
import { navigate } from "../helpers/navigation-helper";
import { INavbarLink, Navbar } from "../shared/Navbar";
import { IJsxElement } from "../types/general-types";
import { useNavigate } from "@solidjs/router";
import { get } from "../helpers/http";
import './WebshopItem.scss';

export function WebshopItem(): IJsxElement {
    const [item, setItem] = createSignal<IDetailedWebshopItem>(new EmptyDetailedWebshopItem())
    const [connecting, setConnecting] = createSignal<IDetailedWebshopItem[]>([])
    const [images, setImages] = createSignal<IGaleryCarouselImage[]>([])
    const links: INavbarLink[] = [
        {text: 'Webshop', onclick: () => navigate(navigator, '/webshop')}
    ]
    const navigator = useNavigate()

    onMount(() => getWebshopItem())

    function getWebshopItemId(): string {
        return Object.fromEntries(new URLSearchParams(window.location.search).entries())?.id ?? '0'
    }

    function getWebshopItem(): void {
        get<IWebshopItemOverView>(`webshopitems/overview/${getWebshopItemId()}`)
            .then(response => {
                setItem(response.item)
                let images = response.item.files.map(x => new GaleryCarouselImage(x.fileid))
                setImages(images)
                // setConnecting([response.item, response.item])
                setConnecting(response.connecting)
            })
            .catch(error => { })
    }

    return (<>
        <Navbar links={links} />

        <div class="webshop-item-container d-flex justify-center">
            <div class="webshop-item d-grid p-4">
                <div class="carousel-container col-12">
                    <GaleryCarousel images={images()} />
                </div>

                <h3 class="col-12 pt-4">{item()?.name} <small class="ml-2">{item().design}</small></h3>
                <h4 class="col-12 pt-2">{item()?.price} Ft</h4>

                <div class="col-12 pt-4">{item()?.description}</div>
                
                <div class="col-12 pt-4">
                    <button class="btn-success"><i class="bi bi-cart mr-1"></i>Kosárba</button>
                </div>

                <Show when={connecting().length > 0}>
                    <h4 class="col-12 pt-4">Kapcsolódó termékek</h4>
                    <div class="col-12 pt-2">
                        <div class="d-flex">
                            <For each={connecting()}>{x =>
                                <ConnectedWebshopItemPreview item={x} />
                            }</For>
                        </div>
                    </div>
                </Show>
            </div>
        </div>
    </>)
}
