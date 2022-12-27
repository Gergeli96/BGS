import { IJsxElement } from "../types/general-types";
import { BitNumber } from "../helpers/number-helper";
import { Show } from "solid-js";
import './PriceTag.scss';

export interface IPriceTagProps {
    discount: number | null
    price: number
}

function calculateDiscountedPrice(price: number, discount: number): number {
    const percentage = (100 - discount) / 100
    console.log(price, discount, percentage)
    return price * percentage
}

export function PriceTag(props: IPriceTagProps): IJsxElement {

    return (
        <Show when={!BitNumber.empty(props.discount) && (props.discount as number) > 0} fallback={<>{props.price} Ft</>}>
            <div class="d-flex">
                <div class="discount">- {props.discount}%</div>
                <h4 class="original-price">{props.price} Ft</h4>
                <h4 class="discounted-price">{calculateDiscountedPrice(props.price, props.discount as number)} Ft</h4>
            </div>
        </Show>
    )
}
