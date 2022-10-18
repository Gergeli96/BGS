import { BitControlGroup, BitControlType } from "../BitForm/bitform-types";
import { IWebshopItemGroup } from "../types/webshop-types";
import { IJsxElement } from "../types/general-types";
import { BitForm } from "../BitForm/BitForm";
import { post } from "../helpers/http";

export function WebshopItemGroupForm(): IJsxElement {
    const controls = new BitControlGroup<IWebshopItemGroup>([
        {label: 'Név', name: 'name'},
        {label: 'Ár', name: 'price', type: BitControlType.number},
        {label: 'Leírás', name: 'description', type: BitControlType.textarea}
    ])

    function save(): void {
        post('webshopitemgroups', controls.value)
            .then(response => controls.empty())
            .catch(error => { })
    }

    return (
        <BitForm controls={controls} >
            <button class="btn-success" onClick={save}>Mentés</button>
        </BitForm>
    )
}
