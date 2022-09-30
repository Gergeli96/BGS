import { BitType, IBitControl } from 'src/app/bitform/gitform-types';
import { BitformComponent } from 'src/app/bitform/bitform.component';
import { HttpService } from 'src/app/services/http.service';
import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-webshop-element-group-form',
    templateUrl: './webshop-element-group-form.component.html',
    styleUrls: ['./webshop-element-group-form.component.scss']
})
export class WebshopElementGroupFormComponent {
    @ViewChild(BitformComponent, {static: true}) form: BitformComponent
    public controls: IBitControl[] = [
        {label: 'Név', name: 'name', required: true},
        {label: 'Ár', name: 'price', type: BitType.number, suffix: 'Ft'},
        {label: 'Leírás', name: 'description', type: BitType.textarea}
    ]
    
    constructor(
        private http: HttpService,
        private router: Router
    ) { }


    public save(navigate: boolean = false): void {
        this.form.submit(this.http.post('webshopelementgroups', this.form.value))
            .then(response => {
                this.form.empty()
                if (navigate) {
                    this.router.navigateByUrl('/admin/webshop/createelement')
                }
            })
            .catch(error => { })
    }
}
