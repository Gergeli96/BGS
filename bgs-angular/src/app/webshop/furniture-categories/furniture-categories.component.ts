import { IFurnitureCategory } from 'src/app/types/furniture-category.types';
import { HttpService } from 'src/app/services/http.service';
import { Component } from '@angular/core';

@Component({
    selector: 'furniture-categories',
    templateUrl: './furniture-categories.component.html',
    styleUrls: ['./furniture-categories.component.scss']
})
export class FurnitureCategoriesComponent {
    public categories: IFurnitureCategory[] = [ ]

    constructor(
        private http: HttpService
    ) {
        this.getCategories()
    }


    private getCategories(): void {
        this.http.get<IFurnitureCategory[]>('furniturecategories')
            .then(response => this.categories = response)
            .catch(error => { })
    }
}
