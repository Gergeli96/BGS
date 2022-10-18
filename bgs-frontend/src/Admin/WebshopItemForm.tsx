import { IDetailedWebshopItem, IWebshopItemForm, IWebshopItemGroup } from "../types/webshop-types";
import { BitControlGroup, BitControlType, SelectOption } from "../BitForm/bitform-types";
import { IFurnitureCategory } from "../types/furniture-category-types";
import { createSignal, onMount, Show } from "solid-js";
import { IJsxElement } from "../types/general-types";
import { get, post, put } from "../helpers/http";
import { BitForm } from "../BitForm/BitForm";

export function WebshopItemForm(): IJsxElement {
    const controls = new BitControlGroup<IWebshopItemForm>([
        {label: 'Csoport', name: 'groupid', type: BitControlType.select, options: [ ], onValueChange: value => onGroupChange(value)},
        {label: 'Kategória', name: 'categoryid', type: BitControlType.select, options: [ ]},
        {label: 'Név', name: 'name'},
        {label: 'Kivitel', name: 'design'},
        {label: 'Ár', name: 'price', type: BitControlType.number},
        {label: 'Leírás', name: 'description', type: BitControlType.textarea},
        {label: 'Képek', name: 'files', type: BitControlType.file}
    ])
    const [editMode, setEditMode] = createSignal<boolean>(false)
    let groups: IWebshopItemGroup[] = [ ]

    onMount(() => {
        Promise.all([getGroups(), getCategories()])
            .then(() => getWebshopItem())
            .catch(error => { })
    })

    function getGroups(): Promise<void> {
        return new Promise((resolve, reject) => {
            get<IWebshopItemGroup[]>('webshopitemgroups')
                .then(response => {
                    groups = response
                    let selectOptions = response.map(x => new SelectOption(x.name, x.id))
                    controls.get('groupid')?.setOptions(selectOptions)
                    resolve()
                })
                .catch(error => reject())
        })
    }

    function getCategories(): Promise<void> {
        return new Promise((resolve, reject) => {
            get<IFurnitureCategory[]>('furniturecategories')
                .then(response => {
                    let selectOptions = response.map(x => new SelectOption(x.name, x.id))
                    controls.get('categoryid')?.setOptions(selectOptions)
                    resolve()
                })
                .catch(error => reject())
        })
    }

    function getWebshopItem(): void {
        const id = Object.fromEntries(new URLSearchParams(window.location.search).entries())?.id ?? null

        if (id != null) {
            get<IDetailedWebshopItem>(`webshopitems/detailed/${id}`)
                .then(response => {
                    controls.setValue(response)
                    setEditMode(true)
                })
                .catch(error => { })
        }
    }

    function onGroupChange(value: any): void {
        let group = groups.find(x => x.id == value)
        if (group) {
            controls.get('name')?.setValue(group.name)
            controls.get('price')?.setValue(group.price)
            controls.get('description')?.setValue(group.description)
        }
    }

    function save(): void {
        post('webshopitems', controls.valueAsFormData)
            .then(response => controls.empty())
            .catch(error => { })
    }

    function edit(): void {
        put('webshopitems', controls.valueAsFormData)
            .then(response => {
                controls.empty()
                setEditMode(false)
            })
            .catch(error => { })
    }

    return (<>
        <Show when={editMode()}>
            <h3 class="danger pb-4">Módosítás közben a form képek eleme figyelmen kívül lesz hagyva. Ha az adott elemhez szeretnél képeket feltölteni vagy törölni azt a Képek kezelése menüpontban teheted meg!</h3>
        </Show>

        <BitForm controls={controls}>
            <Show when={editMode()} fallback={<button class="btn-success" onClick={save}>Mentés</button>}>
                <button class="btn-warning" onClick={edit}>Módosítás</button>
            </Show>
        </BitForm>
    </>)
}