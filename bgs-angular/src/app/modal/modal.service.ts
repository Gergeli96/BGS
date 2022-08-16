import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Injectable } from '@angular/core';
import { ModalBase } from './modal-base';

@Injectable({
    providedIn: 'root'
})
export class ModalService {

    constructor(
        private modalService: NgbModal
    ) { }


    public open<T = any>(modal: any, initData?: T): Promise<boolean> {
        let modalRef = this.modalService.open(modal, {ariaLabelledBy: 'modal-basic-title'})
        const component: ModalBase = modalRef.componentInstance
        component?.init(initData)
        component.close = (result: boolean = false) => modalRef.close(result)

        return modalRef.result
    }
}
