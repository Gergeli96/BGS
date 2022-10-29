import { BitControlGroup, BitControlType, SelectOption } from "../../BitForm/bitform-types";
import { IWebshopItem } from "../../types/webshop-types";
import { IJsxElement } from "../../types/general-types";
import { BitForm } from "../../BitForm/BitForm";
import { Get, Post } from "../../helpers/http";
import { onMount } from "solid-js";

export function UploadImages(): IJsxElement {
    const controls = new BitControlGroup([
        {label: 'Elem', name: 'itemid', type: BitControlType.select, options: []},
        {label: 'Képek', name: 'files', type: BitControlType.file}
    ])

    onMount(() => getWebshopItems())

    function getWebshopItems(): void {
        Get<IWebshopItem[]>('webshopitems')
            .then(response => controls.get('itemid')?.setOptions(response.map(x => new SelectOption(`${x.name} - ${x.design ?? ''}`, x.id))))
    }

    function upload(): void {
        Post('webshopfiles', controls.valueAsFormData)
            .then(() => controls.empty())
            .catch(error => { })
    }

    return (<>
        <h3 class="pb-2">Képek feltöltése</h3>

        <BitForm controls={controls}></BitForm>

        <div class="d-flex justify-end pt-2">
            <button class="btn-success" onClick={upload}>Feltöltés</button>
        </div>
    </>)
}
