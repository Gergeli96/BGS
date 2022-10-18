import { IDetailedWebshopItem, IWebshopFile, IWebshopItem } from "../../types/webshop-types";
import { ISelectOption, SelectOption } from "../../BitForm/bitform-types";
import { IJsxElement } from "../../types/general-types";
import { createSignal, For, onMount } from "solid-js";
import { BitImage } from "../../shared/BitImage";
import { get } from "../../helpers/http";
import './DeleteImages.scss';

export function DeleteImages(): IJsxElement {
    const [selectedItem, setSelectedItem] = createSignal<string>('')
    const [options, setOptions] = createSignal<ISelectOption[]>([])
    const [files, setFiles] = createSignal<IWebshopFile[]>([])

    onMount(() => getWebshopItems())

    function getWebshopItems(): void {
        get<IWebshopItem[]>('webshopitems')
            .then(response => setOptions(response.map(x => new SelectOption(x.name, x.id))))
            .catch(error => { })
    }

    function getItemWithImages(value: string): void {
        setSelectedItem(value)
        get<IDetailedWebshopItem>(`webshopitems/detailed/${selectedItem()}`)
            .then(response => setFiles(response.files))
            .catch(error => { })
    }

    function getFileUrl(file: IWebshopFile): string {
        return `http://drive.google.com/uc?export=view&id=${file.fileid}`
    }

    return (<>
        <h3 class="pb-2">Képek feltöltése</h3>

        <select value={selectedItem()} onChange={e => getItemWithImages(e.currentTarget.value)}>
            <option value="">Kérem válasszon</option>
            <For each={options()}>{x =>
                <option value={x.value}>{x.name}</option>
            }</For>
        </select>

        <ul class="delete-image-list">
            <For each={files()}>{x =>
                <li class="d-flex justify-between align-center">
                    <div class="d-flex">
                        <div class="image-container">
                            <BitImage src={getFileUrl(x)}></BitImage>
                        </div>
                    </div>

                    <div>
                        <button class="btn-danger">Torlés</button>
                    </div>
                </li>
            }</For>
        </ul>
    </>)
}