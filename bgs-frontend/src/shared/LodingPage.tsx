import { IJsxElement } from "../types/general-types";
import './LoadingPage.scss';

export function LoadingPage(): IJsxElement {

    return (<div class="loading-page-container d-flex justify-center align-center">
        <div class="d-flex column align-center">
            <img src="/src/assets/bgs-transparent.png" alt="logo" />

            <h1>Betöltés</h1>
        </div>
    </div>)
}
