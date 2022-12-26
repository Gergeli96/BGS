import { BitControlGroup, BitControlType } from "../BitForm/bitform-types";
import { IWebshopItemGroupForm } from "../types/webshop-types";
import { useNavigate, useParams } from "@solidjs/router";
import { navigate } from "../helpers/navigation-helper";
import { createSignal, onMount, Show } from "solid-js";
import { IJsxElement } from "../types/general-types";
import { Get, Post, Put } from "../helpers/http";
import { BitForm } from "../BitForm/BitForm";

export function WebshopItemGroupForm(): IJsxElement {
    const controls = new BitControlGroup<IWebshopItemGroupForm>([
        {label: 'Név', name: 'name'},
        {label: 'Ár', name: 'price', type: BitControlType.number},
        {label: 'Leírás', name: 'description', type: BitControlType.textarea},
        {label: '', name: 'edititems', type: BitControlType.checkbox, suffix: 'Módosítsa az összes hozzá tartozó bútordarab név, ár és leírás adatait is.'}
    ])
    const [editMode, setEditMode] = createSignal<boolean>(false)
    const navigator = useNavigate()
    const params = useParams()

    onMount(() => {
        setEditMode(!!params.id)
        getWebshopItemGroup()
    })

    function getWebshopItemGroup(): void {
        let id = params.id ?? null

        if (id != null) {
            Get(`webshopitemgroups/entity/${id}`)
                .then(response => setEditMode(true))
                .catch(error => { })
        }
    }

    function save(): void {
        Post('webshopitemgroups', controls.value)
            .then(response => controls.empty())
            .catch(error => { })
    }

    function edit(): void {
        let id = params.id ?? null

        controls.save(Put('webshopitemgroups', {...controls.value, id: id}))
            .then(response => navigate(navigator, '/webshopitemgroup'))
            .catch(error => { })
    }

    return (
        <BitForm controls={controls}>
            <Show when={editMode()} fallback={<button class="btn-success" onClick={save}>Mentés</button>}>
                <button class="btn-warning" onClick={edit}>Módosítás</button>
            </Show>
        </BitForm>
    )
}
