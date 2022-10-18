import { IJsxElement } from "../types/general-types";
import './HomePageFooter.scss';

export function HomePageFooter(): IJsxElement {

    return (
        <footer>
            <div class="d-flex justify-center">
                <img class="company-logo" src="src/assets/bgs-transparent.png" alt="" />
            </div>

            <div class="info-container d-flex">
                <span class="info">Tel: 00 00 000 0000</span>
                <span class="info">E-mail: email@email.com</span>
            </div>
        </footer>
    )
}
