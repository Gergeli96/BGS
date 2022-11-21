import { getImageLinkFromFileList } from "../helpers/drive-image-helper";
import { IDetailedGalery } from "../types/galery-types";
import { navigate } from "../helpers/navigation-helper";
import { INavbarLink, Navbar } from "../shared/Navbar";
import { createSignal, For, onMount } from "solid-js";
import { GalerieModal } from "../Modals/GalerieModal";
import { IJsxElement } from "../types/general-types";
import { openModal } from "../Modals/modal.service";
import { useNavigate } from "@solidjs/router";
import { BitImage } from "../shared/BitImage";
import { Get } from "../helpers/http";
import './Galeries.scss';

export function Galeries(): IJsxElement {
    const [galeries, setGaleries] = createSignal<IDetailedGalery[]>()
    const links: INavbarLink[] = [
        {text: 'Kezdőlap', onclick: () => navigate(navigator, '/')},
        {text: 'Webshop', onclick: () => navigate(navigator, '/webshop')}
    ]
    const navigator = useNavigate()

    onMount(() => getGaleries())

    function getGaleries(): void {
        Get<IDetailedGalery[]>('galeries')
            .then(response => {
                setGaleries(response)
            })
            .catch(error => { })
    }

    function openGaleriemodal(id: number): void {
        openModal(() => GalerieModal({galerieid: id}))
    }

    return (
        <div class="galeries-page-container">
            <Navbar links={links} />

            <div class="galeries-page-content d-flex justify-center p-4">
                <div class="galeries-list d-grid">
                    <For each={galeries()}>{x =>
                        <div class="col-12 pb-4">
                            <div class="d-grid">
                                <div class="col-md-6 col-sm-12 d-flex column">
                                    <h3 class="pb-2">{x.name}</h3>
                                    <p>{x.description}</p>
                                    <div class="d-flex justify-start pt-4">
                                        <button class="btn-grey-thin" onClick={() => openGaleriemodal(x.id as number)}>Összes kép megtekintése</button>
                                    </div>
                                </div>

                                <div class="image-container d-flex justify-center col-md-6 col-sm-12 width-100">
                                    <BitImage src={getImageLinkFromFileList(x.files)}></BitImage>
                                </div>
                            </div>
                        </div>
                    }</For>
                </div>
            </div>
        </div>
    )
}
