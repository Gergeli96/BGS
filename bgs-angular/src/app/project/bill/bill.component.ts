import { BillModalComponent, IBillModalInit } from 'src/app/modal/bill-modal/bill-modal.component';
import { IBitColumn, ICellClickEvent } from 'src/app/bittable/bittable-types';
import { BittableComponent } from 'src/app/bittable/bittable.component';
import { Component, Input, ViewChild } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { ModalService } from 'src/app/modal/modal.service';
import { ModalType } from 'src/app/modal/modal-base';
import { IBill } from 'src/app/types/bill-types';

interface IBillTableCols extends IBill {
    edit: boolean
}

@Component({
    selector: 'app-bill',
    templateUrl: './bill.component.html',
    styleUrls: ['./bill.component.scss']
})
export class BillComponent {
    @ViewChild(BittableComponent, {static: true}) table: BittableComponent
    private projectId: number = 0
    public _bills: IBill[] = [ ]
    public columns: IBitColumn<IBillTableCols>[] = [
        {header: 'Kitől', name: 'from'},
        {header: 'Kinek', name: 'to'},
        {header: 'Összeg', name: 'amount'},
        {header: 'Fizetve', name: 'paid', width: '4em', renderer: row => `<i class="bi ${row.paid ? 'text-success bi-check' : 'text-danger bi-x'}"><i/>`, style: () => new Object({'text-align': 'center'})},
        {header: '', name: 'edit', width: '2em', renderer: () => '<i class="bi bi-pencil-square"></i>'}
    ]

    constructor(
        private modalservice: ModalService,
        private http: HttpService
    ) { }


    @Input('projectid')
    public set projectIdSetter(projectid: number) {
        this.projectId = projectid
        this.getBills()
    }

    public openBillModal(isEdit: boolean = false): void {
        const modalInit: IBillModalInit = {projectId: this.projectId, type: isEdit ? ModalType.warning : ModalType.success}
        this.modalservice.open<IBillModalInit>(BillModalComponent, modalInit)
            .then(result => result ? this.getBills() : null)
    }

    public onCellClick(event: ICellClickEvent<IBillTableCols>): void {
        if (event.column.name === 'paid') {
            this.deleteBill(event.row.id as number)
        }
        else if (event.column.name === 'edit') {
            this.openBillModal(true)
        }
    }

    private getBills(): void {
        this.table.tableFetch(() => this.http.get<IBill[]>(`bills/${this.projectId}`))
            .then(response => this._bills = response.reverse())
            .catch(error => { })
    }

    private deleteBill(id: number): void {
        this.http.delete(`bills/delete/${id}`)
            .then(response => this.getBills())
            .catch(error => { })
    }
}
