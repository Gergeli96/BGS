import { GaleryCarousel, IGaleryCarouselImage } from "../shared/GaleryCarousel";
import { IModalButton, ModalScaffold, ModalSize } from "./ModalScaffold";
import { IDetailedGalery } from "../types/galery-types";
import { IJsxElement } from "../types/general-types";
import { createSignal, onMount } from "solid-js";
import { Get } from "../helpers/http";

export interface IGalerieModalProps {
    galerieid: number
}

export function GalerieModal(props: IGalerieModalProps): IJsxElement {
    const [images, setImages] = createSignal<IGaleryCarouselImage[]>([])
    const modalButtons: IModalButton[] = [

    ]

    onMount(() => getGalerie())

    function getGalerie(): void {
        Get<IDetailedGalery>(`galeries/detailed/${props.galerieid}`)
            .then(response => {
                setImages(response.files.map(x => new Object({url: x.fileid}) as IGaleryCarouselImage))
            })
            .catch(error => { })
    }

    return (
        <ModalScaffold name="" size={ModalSize.full} buttons={modalButtons}>
            <GaleryCarousel images={images()} />
        </ModalScaffold>
    )
}
