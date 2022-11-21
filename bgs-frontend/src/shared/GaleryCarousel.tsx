import { getImageLink } from "../helpers/drive-image-helper";
import { IJsxElement } from "../types/general-types";
import { BitImage } from "./BitImage";
import { For } from "solid-js";
import './GaleryCarousel.scss';

export interface IGaleryCarouselImage {
    url: string
}

export class GaleryCarouselImage {
    public url: string = ''

    constructor(url: string) {
        this.url = url
    }
}

export interface IGaleryCarouselProps {
    images: IGaleryCarouselImage[]
}

export function GaleryCarousel(props: IGaleryCarouselProps): IJsxElement {
    let carouselContainer: HTMLDivElement | undefined

    function step(event: Event, direction: 1 | -1): void {
        event.stopPropagation(); event.preventDefault()
        let activeImage = carouselContainer?.querySelector('[attr-active="true"]')
        let nextImage = direction == 1 ? activeImage?.nextElementSibling : activeImage?.previousElementSibling

        if (nextImage && nextImage.nodeName == 'IMG') {
            activeImage?.setAttribute('attr-active', 'false')
            nextImage.setAttribute('attr-active', 'true')
        }
    }

    return (
        <div ref={carouselContainer} class="galery-carousel-container d-flex justify-between align-center">
            <i class="bi bi-chevron-compact-left cursor-pointer pr-2" onClick={e => step(e, -1)}></i>

            <div class="galery-images-container d-flex justify-center align-center">
                <For each={props.images}>{(x, i) =>
                    <BitImage src={getImageLink(x.url)} attributes={{'attr-active': i() == 0 ? 'true' : 'false'}} />
                }</For>
            </div>

            <i class="bi bi-chevron-compact-right cursor-pointer pl-2" onClick={e => step(e, 1)}></i>
        </div>
    )
}
