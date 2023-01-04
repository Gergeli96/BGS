import { getImageLink } from "../helpers/drive-image-helper";
import { IJsxElement } from "../types/general-types";
import { BitNumber } from "../helpers/number-helper";
import { createEffect, For } from "solid-js";
import { BitImage } from "./BitImage";
import './GaleryCarousel.scss';

export interface IGaleryCarouselImage<T = any> {
    url: string
    data?: T
}

export class GaleryCarouselImage {
    public url: string = ''

    constructor(url: string) {
        this.url = url
    }
}

export interface IGaleryCarouselProps {
    onChange?: (image: IGaleryCarouselImage) => void
    images: IGaleryCarouselImage[]
}

export function GaleryCarousel(props: IGaleryCarouselProps): IJsxElement {
    let carouselContainer: HTMLDivElement | undefined

    createEffect(() => {
        if (props.onChange) props.onChange(props.images[0])
    })

    function step(event: Event, direction: 1 | -1): void {
        event.stopPropagation(); event.preventDefault()
        let activeImage = carouselContainer?.querySelector('[attr-active="true"]')
        let nextImage = direction == 1 ? activeImage?.nextElementSibling : activeImage?.previousElementSibling

        if (nextImage && nextImage.nodeName == 'IMG') {
            activeImage?.setAttribute('attr-active', 'false')
            nextImage.setAttribute('attr-active', 'true')
        }

        if (props.onChange) {
            let index = nextImage?.getAttribute('attr-index')
            if (index && BitNumber.parseInt(index) as number >= 0) {
                props.onChange(props.images[BitNumber.parseInt(index) as number])
            }
        }
    }

    return (
        <div ref={carouselContainer} class="galery-carousel-container d-flex justify-between align-center">
            <i class="bi bi-chevron-compact-left cursor-pointer pr-2" onClick={e => step(e, -1)}></i>

            <div class="galery-images-container d-flex justify-center align-center">
                <For each={props.images}>{(x, i) =>
                    <BitImage src={getImageLink(x.url)} attributes={{'attr-active': i() == 0 ? 'true' : 'false', 'attr-index': i().toString()}} />
                }</For>
            </div>

            <i class="bi bi-chevron-compact-right cursor-pointer pl-2" onClick={e => step(e, 1)}></i>
        </div>
    )
}
