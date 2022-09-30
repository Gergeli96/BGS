import { IWebshopElementForm, IWebshopElementGroup } from 'src/app/types/webshop.types';
import { BitType, IBitControl } from 'src/app/bitform/gitform-types';
import { BitformComponent } from 'src/app/bitform/bitform.component';
import { SelectOption } from 'src/app/helpers/select-option.helper';
import { HttpService } from 'src/app/services/http.service';
import { Component, ViewChild } from '@angular/core';
import { Common } from 'src/app/helpers/common';

@Component({
    selector: 'app-webshop-element-form',
    templateUrl: './webshop-element-form.component.html',
    styleUrls: ['./webshop-element-form.component.scss']
})
export class WebshopElementFormComponent {
    @ViewChild(BitformComponent, {static: true}) form: BitformComponent<IWebshopElementForm>
    private webshopElementGroups: IWebshopElementGroup[] = [ ]
    public controls: IBitControl[] = [
        {label: 'Csoport', name: 'groupid', type: BitType.select, options: [ ]},
        {label: 'Név', name: 'name', required: true},
        {label: 'Ár', name: 'price', type: BitType.number, suffix: 'Ft'},
        {label: 'Leírás', name: 'description', type: BitType.textarea},
        {label: 'Képek', name: 'files', type: BitType.file}
    ]

    constructor(
        private http: HttpService
    ) { }

    ngOnInit(): void {
        this.getGroups()
    }

    ngAfterViewInit(): void {
        this.form.get('groupid')?.subscribeToValueChange(control => this.groupidValueChange(control))
    }


    public save(): void {
        const formValue = this.form.value
        const formData = new FormData()
        formData.set('name', formValue.name)
        formData.set('price', formValue.price?.toString() ?? '')
        formData.set('groupid', formValue.groupid?.toString() ?? '')
        formData.set('description', formValue.description)

        for (let i = 0; i < formValue.files.length; i++) {
            formData.append('files', formValue.files.item(i) as Blob)
        }

        this.form.submit(this.http.post('webshopelements', formData))
            .then(response => this.form.empty())
            .catch(error => { })
    }

    private getGroups(): void {
        this.http.get<IWebshopElementGroup[]>('webshopelementgroups')
            .then(response => {
                this.form.get('groupid')?.setSelectOptions(response.map(x => new SelectOption(x.name, x.id)), true)
                this.webshopElementGroups = response
            })
            .catch(error => { })
    }

    private groupidValueChange(control: IBitControl): void {
        if (control.value) {
            let elementGroup = this.webshopElementGroups.find(x => x.id == control.value)

            if (elementGroup) {
                let price = this.form.get('price')
                if (Common.empty(price?.value)) price?.setValue(elementGroup.price)
                let name = this.form.get('name')
                if (Common.empty(name?.value)) name?.setValue(elementGroup.name)
            }
        }
    }
}
