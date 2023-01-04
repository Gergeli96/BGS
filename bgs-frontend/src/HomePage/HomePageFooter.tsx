import { IJsxElement } from "../types/general-types";
import './HomePageFooter.scss';

export function HomePageFooter(): IJsxElement {

    return (
        <footer>
            <div class="d-flex justify-center">
                <img class="company-logo" src="src/assets/bgs-transparent.png" alt="" />
            </div>

            <div class="info-container d-flex justify-between">
                <div class="d-flex">
                    <span>Tel: 00 00 000 0000</span>
                    <span>E-mail: email@email.com</span>
                </div>

                <i class="bi bi-facebook cursor-pointer"></i>
            </div>
        </footer>
    )
}
