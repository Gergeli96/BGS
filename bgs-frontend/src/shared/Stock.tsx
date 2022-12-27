import { IJsxElement } from "../types/general-types";
import { cart, setCart } from "../App";
import { Show } from "solid-js";

export interface IStockProps {
    itemId: number
    stock: number
}

export function Stock(props: IStockProps): IJsxElement {

    function addToCart(): void {
        setCart([...cart(), props.itemId])
    }
    
    return (
        <Show when={props.stock > 0} fallback={<>Jelenleg nincs készlete. További információkért kérjük lépjen kapcsolatba az eladóval.</>}>
            <button class="btn-success mr-2" onClick={addToCart}><i class="bi bi-cart mr-1"></i>Kosárba</button>Készleten: {props.stock} db
        </Show>
    )
}
