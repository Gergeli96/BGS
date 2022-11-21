import { getImageLinkFromFileList } from "../helpers/drive-image-helper";
import { IDetailedGalery } from "../types/galery-types";
import { createSignal, For, onMount } from "solid-js";
import { IJsxElement } from "../types/general-types";
import { Delete, Get } from "../helpers/http";
import { BitImage } from "../shared/BitImage";
import './GalerieDelete.scss';

export function GalerieDelete(): IJsxElement {
    const [galeries, setGaleries] = createSignal<IDetailedGalery[]>([])

    onMount(() => getGaleries())

    function getGaleries(): void {
        Get<IDetailedGalery[]>('galeries')
            .then(response => setGaleries(response))
            .catch(error => { })
    }

    function deleteGalerie(id: number): void {
        Delete(`galeries/delete/${id}`)
            .then(response => getGaleries())
            .catch(error => { console.log(error) })
    }

    return (<>
        <ul class="galerie-delete-list">
            <For each={galeries()}>{x =>
                <li class="d-flex justify-between">
                    <div class="d-flex column">
                        <h3>{x.name}</h3>
                        <p>{x.name}</p>
                    </div>

                    <div class="d-flex image-container align-center">
                        <BitImage src={getImageLinkFromFileList(x.files)} />

                        <i class="bi bi-trash3 pl-3 cursor-pointer" onClick={() => deleteGalerie(x.id as number)}></i>
                    </div>
                </li>
            }</For>
        </ul>
    </>)
}
