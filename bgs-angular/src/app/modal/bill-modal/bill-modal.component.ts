import { BitType, IBitControl } from 'src/app/bitform/gitform-types';
import { BitformComponent } from 'src/app/bitform/bitform.component';
import { HttpService } from 'src/app/services/http.service';
import { ModalBase, ModalType } from '../modal-base';
import { Component, ViewChild } from '@angular/core';
import { IBill } from 'src/app/types/bill-types';

export interface IBillModalInit {
    projectId: number
    type: ModalType
}

@Component({
    selector: 'app-bill-modal',
    templateUrl: './bill-modal.component.html',
    styleUrls: ['./bill-modal.component.scss']
})
export class BillModalComponent extends ModalBase {
    @ViewChild(BitformComponent, {static: true}) public form: BitformComponent<IBill>
    public controls: IBitControl[] = [
        {label: 'Kitől', name: 'from'},
        {label: 'Kinek', name: 'to'},
        {label: 'Összeg', name: 'amount', type: BitType.number},
        {label: 'Fizetve', name: 'paid', type: BitType.checkbox}
    ]
    private projectId: number
    public type: ModalType

    constructor(
        private http: HttpService
    ) {
        super()
    }

    public override init(data: IBillModalInit): void {
        this.projectId = data.projectId
        this.type = data.type
    }


    public save(): void {
        let body: IBill = {...this.form.value, project_id: this.projectId}

        if (this.type == ModalType.warning) {
            this.http.put('bills/update', body)
                .then(resposne => this.close(true))
                .catch(error => { })
        }
        else {
            this.http.post('bills/create', body)
                .then(resposne => this.close(true))
                .catch(error => { })
        }
    }
}
