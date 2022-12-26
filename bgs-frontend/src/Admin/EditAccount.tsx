import { BitControlGroup, BitControlType } from "../BitForm/bitform-types";
import { useAuth } from "../Authentication/AuthProvider";
import { IJsxElement } from "../types/general-types";
import { IWhoAmI } from "../types/auth-types";
import { BitForm } from "../BitForm/BitForm";
import { Put } from "../helpers/http";

export function EditAccount(): IJsxElement {
    const auth = useAuth()
    const controls = new BitControlGroup([
        {label: 'Felhasználónév', name: 'username', value: auth?.user().username},
        {label: 'E-mail', name: 'email', value: auth?.user().email},
        {label: 'Profilkép', name: 'avatar', type: BitControlType.file}
    ])

    function save(): void {
        controls.save<IWhoAmI>(Put('auth/editself', controls.valueAsFormData))
            .then(response => {
                auth?.login(response)
                controls.setValue({username: response.username, email: response.email, avatar: ''})
            })
            .catch(error => { })
    }

    return (<>
        <BitForm controls={controls} />
    
        <div class="d-flex justify-end">
            <button class="btn-success" onClick={save}>Mentés</button>
        </div>
    </>)
}
