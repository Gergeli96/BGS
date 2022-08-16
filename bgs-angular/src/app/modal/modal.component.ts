import { Component, ElementRef, Input } from '@angular/core';
import { ModalSize, ModalType } from './modal-base';

@Component({
    selector: 'app-modal',
    templateUrl: './modal.component.html',
    styleUrls: ['./modal.component.scss']
})
export class ModalComponent {

    constructor(
        private elementRef: ElementRef<HTMLElement>
    ) { }


    @Input('size')
    public set modalSize(value: ModalSize) {
        this.elementRef.nativeElement.closest('.modal-dialog')?.classList.add(value)
    }

    @Input('type')
    public set modalType(value: ModalType) {
        this.elementRef.nativeElement.closest('.modal-content')?.classList.add(value)
    }
}
