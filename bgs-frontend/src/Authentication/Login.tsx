import { BitControlGroup, BitControlType } from "../BitForm/bitform-types";
import { navigate } from "../helpers/navigation-helper";
import { IJsxElement } from "../types/general-types";
import { BitAuth, useAuth } from "./AuthProvider";
import { useNavigate } from "@solidjs/router";
import { IWhoAmI } from "../types/auth-types";
import { BitForm } from "../BitForm/BitForm";
import { Post } from "../helpers/http";
import './Login.scss';

export function Login(): IJsxElement {
    const controls = new BitControlGroup([
        {label: 'Felhasználónév', name: 'username'},
        {label: 'Jelszó', name: 'password', type: BitControlType.password},
    ])
    const auth = useAuth() as BitAuth
    const navigator = useNavigate()

    function login(): void {
        Post<IWhoAmI>('auth/login', controls.value)
            .then(response => {
                auth.login(response)
                navigate(navigator, '/admin/galerieform')
            })
            .catch(error => { })
    }

    return (
        <div class="login-container d-flex justify-center align-center">
            <div class="login-card">
                <div class="d-flex justify-center pb-4">
                    <h2>Bejelentkezés</h2>
                </div>

                <BitForm controls={controls} />

                <div class="d-flex justify-end pt-4">
                    <button class="btn-success" onClick={login}>Bejelentkezés</button>
                </div>
            </div>
        </div>
    )
}
