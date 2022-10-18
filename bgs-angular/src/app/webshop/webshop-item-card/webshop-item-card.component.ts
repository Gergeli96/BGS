import { EmptyWebshopElement, EmptyWebshopFile, IWebshopElement } from 'src/app/types/webshop.types';
import { Component, Input } from '@angular/core';

@Component({
    selector: 'webshop-item-card',
    templateUrl: './webshop-item-card.component.html',
    styleUrls: ['./webshop-item-card.component.scss']
})
export class WebshopItemCardComponent {
    public element: IWebshopElement = new EmptyWebshopElement()

    constructor() { }


    @Input('element')
    public set elementSetter(data: IWebshopElement) {
        if (data.files?.length === 0) data.files = [new EmptyWebshopFile()]
        this.element = data
    }

}
