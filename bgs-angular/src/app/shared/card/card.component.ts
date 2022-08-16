import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.scss']
})
export class CardComponent {
    @Input('content') public content: string
    @Input('imgsrc') public imgsrc: string
    @Input('title') public title: string
}
