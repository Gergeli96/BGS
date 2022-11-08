import { GaleryCarousel, IGaleryCarouselImage } from "../shared/GaleryCarousel";
import { IDetailedGalery } from "../types/galery-types";
import { navigate } from "../helpers/navigation-helper";
import { IJsxElement } from "../types/general-types";
import { createSignal, onMount } from "solid-js";
import { useNavigate } from "@solidjs/router";
import { Get } from "../helpers/http";
import './HomePageGalery.scss';

export function HomePageGalery(): IJsxElement {
    const [galeries, setGaleries] = createSignal<IGaleryCarouselImage[]>([])
    let previewContainer: HTMLDivElement | undefined
    const navigator = useNavigate()

    onMount(() => getGaleries())

    function getGaleries(): void {
        Get<IDetailedGalery[]>('galeries')
            .then(response => {
                let files = response.map(x => {return {url: x.files[0]?.fileid ?? ''}})
                setGaleries(files)
            })
            .catch(error => { })
    }

    function open(): void {
        // const id = previewContainer?.querySelector('[attr-active="true"]')?.getAttribute('attr-id')
        navigate(navigator, '/galeries')
    }

    return (
        <div id="homepage-galery" class="home-page-galery-container d-flex column">
            <div class="carousel-container">
                <GaleryCarousel images={galeries()} />
            </div>

            <div class="d-flex justify-center pt-4">
                <button class="btn-grey" onClick={open}>Megnyitás</button>
            </div>
        </div>
    )
}
