import { GaleryCarousel, IGaleryCarouselImage } from "../shared/GaleryCarousel";
import { IJsxElement } from "../types/general-types";
import { createSignal, onMount } from "solid-js";
import { IGalery } from "../types/galery-types";
import { Get } from "../helpers/http";
import './HomePageGalery.scss';

export function HomePageGalery(): IJsxElement {
    const [galeries, setGaleries] = createSignal<IGaleryCarouselImage[]>([])
    let previewContainer: HTMLDivElement | undefined

    onMount(() => getGaleries())

    function getGaleries(): void {
        Get<IGalery[]>('galeries')
            .then(response => {
                let files = response.map(x => {return {url: x.files[0]?.fileid ?? ''}})
                setGaleries(files)
            })
            .catch(error => { console.log(error) })
    }

    function open(): void {
        const id = previewContainer?.querySelector('[attr-active="true"]')?.getAttribute('attr-id')
    }

    return (
        <div id="homepage-galery" class="home-page-galery-container d-flex column">
            <GaleryCarousel images={galeries()} />

            <div class="d-flex justify-center pt-4">
                <button class="btn-grey" onClick={open}>Megnyitás</button>
            </div>
        </div>
    )
}
