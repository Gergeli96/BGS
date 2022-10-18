import { EventEmitter, Injectable } from "@angular/core";

@Injectable({providedIn: 'root'})
export class WebshopCartService {
    public readonly cartContentChangeEvent = new EventEmitter<number[]>()
    private readonly localStorageKey: string = 'WEBSHOP_CART'
    private cart: number[] = this.localStorageCart


    public getCartContent(): number[] {
        return Array.isArray(this.cart) ? this.cart : [ ]
    }

    public addToCartContent(item: number): void {
        this.cart.push(item)
        this.cartContentChangeEvent.emit(this.cart)
    }

    private get localStorageCart(): number[] {
        let cart = localStorage.getItem(this.localStorageKey)

        if (cart && Array.isArray(JSON.parse(cart))) {
            return JSON.parse(cart)
        }
        else {
            return [ ]
        }
    }

    private set localStorageCart(data: number[]) {
        localStorage.setItem(this.localStorageKey, JSON.stringify(this.cart))
    }
}
