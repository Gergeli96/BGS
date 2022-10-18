import { BitControlGroup, BitControlType, SelectOption } from "../../BitForm/bitform-types";
import { IWebshopItem } from "../../types/webshop-types";
import { IJsxElement } from "../../types/general-types";
import { BitForm } from "../../BitForm/BitForm";
import { get } from "../../helpers/http";
import { onMount } from "solid-js";

export function UploadImages(): IJsxElement {
    const controls = new BitControlGroup([
        {label: 'Elem', name: 'id', type: BitControlType.select, options: []},
        {label: 'Képek', name: 'files', type: BitControlType.file}
    ])

    onMount(() => getWebshopItems())

    function getWebshopItems(): void {
        get<IWebshopItem[]>('webshopitems')
            .then(response => controls.get('id')?.setOptions(response.map(x => new SelectOption(x.name, x.id))))
    }

    return (<>
        <h3 class="pb-2">Képek feltöltése</h3>

        <BitForm controls={controls}></BitForm>
    </>)
}
