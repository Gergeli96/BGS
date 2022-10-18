import { WebshopCartService } from 'src/app/services/webshop-cart.service';
import { Component, Input } from '@angular/core';
import { Subscription } from 'rxjs';

export interface INavbarNavItem {
    onclick: () => void
    text: string
}

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
    @Input('navitems') navItems: INavbarNavItem[]
    private cartContentChangeSubscription: Subscription
    public cart: number = 0

    constructor(
        private cartService: WebshopCartService
    ) {
        this.cart = this.cartService.getCartContent().length
    }

    ngOnInit(): void {
        this.cartContentChangeSubscription = this.cartService.cartContentChangeEvent
            .subscribe(() => this.onCartContentChange())
    }

    ngOnDestroy(): void {
        this.cartContentChangeSubscription?.unsubscribe()
    }


    private onCartContentChange(): void {
       this.cart = this.cartService.getCartContent().length
    }
}
