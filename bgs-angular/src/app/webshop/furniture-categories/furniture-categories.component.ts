import { WebshopIndexService } from 'src/app/services/webshor-index.service';
import { IFurnitureCategory } from 'src/app/types/furniture-category.types';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'furniture-categories',
    templateUrl: './furniture-categories.component.html',
    styleUrls: ['./furniture-categories.component.scss']
})
export class FurnitureCategoriesComponent {
    @ViewChild('categoryList', {static: true}) categoryListRef: ElementRef<HTMLElement>
    private categoryChangeSubscription: Subscription
    public categories: IFurnitureCategory[] = [ ]

    constructor(
        private wiService: WebshopIndexService,
        private http: HttpService
    ) {
        this.getCategories()
    }

    ngAfterViewInit(): void {
        this.lisenToCategoryChange()
    }

    ngOnDestroy(): void {
        this.categoryChangeSubscription?.unsubscribe()
    }


    public get categoryList(): HTMLElement {
        return this.categoryListRef.nativeElement
    }

    public changeActiveCategory(category: number): void {
        this.wiService.selectedCategory.next(category)
    }

    private getCategories(): void {
        this.http.get<IFurnitureCategory[]>('furniturecategories')
            .then(response => this.categories = response)
            .catch(error => { })
    }

    private lisenToCategoryChange(): void {
        this.categoryChangeSubscription = this.wiService.selectedCategory.subscribe(() =>this.onCategoryChange())
    }

    private onCategoryChange(): void {
        this.categoryList.querySelector('li.active')?.classList?.remove('active')
        this.categoryList
            .querySelector(`li[identifier="${this.wiService.selectedCategory.getValue()}"]`)
            ?.classList?.add('active')
    }
}
