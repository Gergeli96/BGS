import { Component, Input } from '@angular/core';

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
}
