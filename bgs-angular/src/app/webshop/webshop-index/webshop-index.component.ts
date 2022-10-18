import { WebshopIndexService } from 'src/app/services/webshor-index.service';
import { IWebshopElement } from 'src/app/types/webshop.types';
import { HttpService } from 'src/app/services/http.service';
import { Component } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-webshop-index',
    templateUrl: './webshop-index.component.html',
    styleUrls: ['./webshop-index.component.scss'],
    providers: [WebshopIndexService]
})
export class WebshopIndexComponent {
    private categoryChangeSubscription: Subscription
    public webshopElements: IWebshopElement[]

    constructor(
        private wiService: WebshopIndexService,
        private http: HttpService
    ) {
        // this.getWebshopElements()
    }

    ngOnInit(): void {
        this.categoryChangeSubscription = this.wiService.selectedCategory.subscribe(() => this.getWebshopElements())
    }

    ngOnDestroy(): void {
        this.categoryChangeSubscription?.unsubscribe()
    }


    private getWebshopElements(): void {
        this.http.get<IWebshopElement[]>(`webshopelements/${this.wiService.selectedCategory.getValue()}`)
            .then(response => this.webshopElements = response)
            .catch(error => { })
    }
}
