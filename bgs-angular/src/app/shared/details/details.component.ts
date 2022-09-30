import { Component } from '@angular/core';

@Component({
    selector: 'app-details',
    templateUrl: './details.component.html',
    styleUrls: ['./details.component.scss']
})
export class DetailsComponent {

    constructor() { }


    public toggle(element: HTMLElement): void {
        if (element.classList.contains('opened')) {
            element.classList.remove('opened')
        }
        else {
            element.classList.add('opened')
        }
    }
}
