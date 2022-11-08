import { BitControlGroup, BitControlType } from "../BitForm/bitform-types";
import { IJsxElement } from "../types/general-types";
import { BitForm } from "../BitForm/BitForm";
import { Post } from "../helpers/http";

export function GalerieForm(): IJsxElement {
    const controls = new BitControlGroup([
        {label: 'Név', name: 'name'},
        {label: 'Leírás', name: 'description', type: BitControlType.textarea},
        {label: '', name: 'files', type: BitControlType.file},
    ])

    function save(): void {
        Post('galeries/upload', controls.valueAsFormData)
            .then(response => controls.empty())
            .catch(error => { })
    }

    return (<>
        <BitForm controls={controls} />

        <div class="d-flex justify-end pt-2">
            <button class="btn-success" onClick={save}>Mentés</button>
        </div>
    </>)
}
