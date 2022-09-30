import { INavbarNavItem } from '../shared/navbar/navbar.component';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-webshop',
    templateUrl: './webshop.component.html',
    styleUrls: ['./webshop.component.scss']
})
export class WebshopComponent implements OnInit {
    public navItems: INavbarNavItem[] = [ ]

    constructor() { }

    ngOnInit(): void {
    }

}
