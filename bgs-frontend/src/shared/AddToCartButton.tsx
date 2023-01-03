import { createEffect, createSignal, Show } from "solid-js";
import { IJsxElement } from "../types/general-types";
import { cart, setCart } from "../App";
import './AddToCartButton.scss';

export interface IAddToCartButtonProps {
    withStock: boolean
    itemId: number
    stock?: number
}

export function AddToCartButton(props: IAddToCartButtonProps): IJsxElement {
    const [orderCount, setOrderCount] = createSignal<number>(0)
    let button: HTMLButtonElement | undefined

    createEffect(() => {
        if (props.withStock && (props.stock as number) <= 0) {
            button?.setAttribute('disabled', 'true')
        }
        else {
            button?.removeAttribute('disabled')
        }
    })

    function addToCart(): void {
        setCart([...cart(), props.itemId])
    }

    function changeOrderCount(toAdd: number): void {
        const newOrderCount = orderCount() + toAdd
        if (props.withStock && (props.stock as number) < newOrderCount) return
        
        if (newOrderCount >= 0) {
            setOrderCount(orderCount() + toAdd)
        }
    }

    return (
        <div class="add-to-cart-button-container d-flex align-center">
            <button ref={button} class="btn-success mr-2" onClick={addToCart}><i class="bi bi-cart mr-1"></i>Kosárba</button>
            <Show when={props.withStock}>
                <input type="text" class="quantity" value={orderCount()} disabled />
                <div class="d-flex justify-between column ml-1 mr-2">
                    <i class="bi bi-chevron-compact-up cursor-pointer" onClick={() => changeOrderCount(1)}></i>
                    <i class="bi bi-chevron-compact-down cursor-pointer" onClick={() => changeOrderCount(-1)}></i>
                </div>
                <Show when={props.stock != undefined && props.stock > 0} fallback={<>Jelenleg nincs készleten. További információkért kérjük lépjen kapcsolatba az eladóval.</>}>
                    Készleten: {props.stock} db
                </Show>
            </Show>
        </div>
    )
}
