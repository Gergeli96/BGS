import { IDetailedWebshopItem, IWebshopItemForm, IWebshopItemGroup } from "../types/webshop-types";
import { BitControlGroup, BitControlType, SelectOption } from "../BitForm/bitform-types";
import { IFurnitureCategory } from "../types/furniture-category-types";
import { useNavigate, useParams } from "@solidjs/router";
import { navigate } from "../helpers/navigation-helper";
import { createSignal, onMount, Show } from "solid-js";
import { IJsxElement } from "../types/general-types";
import { Get, Post, Put } from "../helpers/http";
import { BitForm } from "../BitForm/BitForm";

export function WebshopItemForm(): IJsxElement {
    const controls = new BitControlGroup<IWebshopItemForm>([
        {label: 'Csoport', name: 'groupid', type: BitControlType.select, options: [ ], onValueChange: value => onGroupChange(value)},
        {label: 'Kategória', name: 'categoryid', type: BitControlType.select, options: [ ]},
        {label: 'Név', name: 'name'},
        {label: 'Kivitel', name: 'design'},
        {label: 'Ár', name: 'price', type: BitControlType.number, suffix: <div class="suffix">Ft</div>},
        {label: 'Leárazás (kedvezmény)', name: 'discount', type: BitControlType.number, suffix: <div class="suffix">%</div>},
        {label: 'Készlet', name: 'stock', type: BitControlType.number, suffix: <div class="suffix">Db</div>},
        {label: 'Leírás', name: 'description', type: BitControlType.textarea},
        {label: 'Képek', name: 'files', type: BitControlType.file}
    ])
    const [editMode, setEditMode] = createSignal<boolean>(false)
    const navigator = useNavigate()
    const params = useParams()
    let groups: IWebshopItemGroup[] = [ ]

    onMount(() => {
        setEditMode(!!params.id)
        Promise.all([getGroups(), getCategories()])
            .then(() => getWebshopItem())
            .catch(error => { })
    })

    function getGroups(): Promise<void> {
        return new Promise((resolve, reject) => {
            Get<IWebshopItemGroup[]>('webshopitemgroups')
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
            Get<IFurnitureCategory[]>('furniturecategories')
                .then(response => {
                    let selectOptions = response.map(x => new SelectOption(x.name, x.id))
                    controls.get('categoryid')?.setOptions(selectOptions)
                    resolve()
                })
                .catch(error => reject())
        })
    }

    function getWebshopItem(): void {
        const id = params.id ?? null

        if (id != null) {
            Get<IDetailedWebshopItem>(`webshopitems/detailed/${id}`)
                .then(response => controls.setValue(response))
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
        Post('webshopitems', controls.valueAsFormData)
            .then(response => controls.empty())
            .catch(error => { })
    }

    function edit(): void {
        const formData = controls.valueAsFormData
        formData.set('id', params.id ?? '')

        controls.save(Put('webshopitems', formData))
            .then(response => navigate(navigator, '/webshopitem'))
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
