import { IWebshopElementGroup } from 'src/app/types/webshop.types';
import { HttpService } from 'src/app/services/http.service';
import { Component } from '@angular/core';

@Component({
    selector: 'app-webshop-elements',
    templateUrl: './webshop-elements.component.html',
    styleUrls: ['./webshop-elements.component.scss']
})
export class WebshopElementsComponent {
    public groups: IWebshopElementGroup[] = [ ]

    constructor(
        private http: HttpService
    ) {
        this.getGroups()
    }


    private getGroups(): void {
        this.http.get<IWebshopElementGroup[]>('webshopelementgroups/detailed')
            .then(response => this.groups = response)
            .catch(error => { })
    }
}
