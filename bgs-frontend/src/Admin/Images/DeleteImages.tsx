import { IDetailedWebshopItem, IWebshopFile, IWebshopItem } from "../../types/webshop-types";
import { ISelectOption, SelectOption } from "../../BitForm/bitform-types";
import { createSignal, For, onMount, Show } from "solid-js";
import { IJsxElement } from "../../types/general-types";
import { Delete, Get } from "../../helpers/http";
import { BitImage } from "../../shared/BitImage";
import './DeleteImages.scss';

export function DeleteImages(): IJsxElement {
    const [selectedItem, setSelectedItem] = createSignal<string>('')
    const [options, setOptions] = createSignal<ISelectOption[]>([])
    const [files, setFiles] = createSignal<IWebshopFile[]>([])

    onMount(() => getWebshopItems())

    function getWebshopItems(): void {
        Get<IWebshopItem[]>('webshopitems')
            .then(response => setOptions(response.map(x => new SelectOption(`${x.name} - ${x.design ?? ''}`, x.id))))
            .catch(error => { })
    }

    function getItemWithImages(value: string): void {
        setSelectedItem(value)
        if (value == '') {
            setFiles([])
        }
        else {
            Get<IDetailedWebshopItem>(`webshopitems/detailed/${selectedItem()}`)
                .then(response => setFiles(response.files))
                .catch(error => { })
        }
    }

    function getFileUrl(file: IWebshopFile): string {
        return `http://drive.google.com/uc?export=view&id=${file.fileid}`
    }

    function deleteImage(id: number): void {
        Delete(`webshopfiles/delete/${id}`)
            .then(response => getItemWithImages(selectedItem()))
            .catch(error => { })
    }

    function getImagesList(): IJsxElement {
        return (<For each={files()}>{x =>
            <li class="d-flex justify-between align-center">
                <div class="d-flex">
                    <div class="image-container">
                        <BitImage src={getFileUrl(x)}></BitImage>
                    </div>
                </div>

                <div>
                    <button class="btn-danger" onClick={() => deleteImage(x.id)}>Törlés</button>
                </div>
            </li>
        }</For>)
    }

    function emptyImagesListMessage(): IJsxElement {
        return selectedItem() == '' ? <></> : <i><h4>Nincsenek megjeleníthető képek!</h4></i>
    }

    return (<>
        <h3 class="pb-2">Képek törlése</h3>

        <select value={selectedItem()} onChange={e => getItemWithImages(e.currentTarget.value)}>
            <option value="">Kérem válasszon</option>
            <For each={options()}>{x =>
                <option value={x.value}>{x.name}</option>
            }</For>
        </select>

        <ul class="delete-image-list mt-4">
            <Show when={files().length > 0} fallback={emptyImagesListMessage()}>
                {getImagesList()}
            </Show>
        </ul>
    </>)
}
