import { navigate } from "../helpers/navigation-helper";
import { IJsxElement } from "../types/general-types";
import { useNavigate } from "@solidjs/router";
import './WebshopCartIcon.scss';
import { cart } from "../App";

export function WebshopCartIcon(): IJsxElement {
    const navigator = useNavigate()

    return (
        <div class="webshop-cart-icon-container" onClick={() => navigate(navigator, '/webshopcart')}>
            <i class="bi bi-cart cursor-pointer"></i>
            <div class="itemcount">{cart().length ?? 0}</div>
        </div>
    )
}
