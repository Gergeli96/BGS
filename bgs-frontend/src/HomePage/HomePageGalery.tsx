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
    const [activeImage, setActiveImage] = createSignal<IDetailedGalery>()
    let previewContainer: HTMLDivElement | undefined
    const navigator = useNavigate()

    onMount(() => getGaleries())

    function getGaleries(): void {
        Get<IDetailedGalery[]>('galeries')
            .then(response => {
                let files = response.map(x => {return {url: x.files[0]?.fileid ?? '', data: x}})
                setGaleries(files)
            })
            .catch(error => { })
    }

    function open(): void {
        navigate(navigator, '/galeries')
    }

    function onImageChange(image: IGaleryCarouselImage<IDetailedGalery>): void {
        if (image?.data) {
            setActiveImage(image.data)
        }
    }

    return (
        <div id="homepage-galery" class="home-page-galery-container d-flex column pt-4 pb-4">
            <div class="carousel-container">
                <GaleryCarousel images={galeries()} onChange={onImageChange} />
            </div>

            <div class="d-flex justify-center pt-4">
                <button class="btn-grey" onClick={open}>{activeImage()?.name}</button>
            </div>
        </div>
    )
}
