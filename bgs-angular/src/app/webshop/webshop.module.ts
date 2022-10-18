import { WebshopRoutingModule } from './webshop-routing.module';
import { BitformModule } from '../bitform/bitform.module';
import { SharedModule } from '../shared/shared.module';
import { PipesModule } from '../pipes/pipes.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { WebshopElementGroupFormComponent } from './webshop-element-group-form/webshop-element-group-form.component';
import { FurnitureCategoriesComponent } from './furniture-categories/furniture-categories.component';
import { WebshopElementFormComponent } from './webshop-element-form/webshop-element-form.component';
import { WebshopItemCardComponent } from './webshop-item-card/webshop-item-card.component';
import { WebshopElementsComponent } from './webshop-elements/webshop-elements.component';
import { WebshopIndexComponent } from './webshop-index/webshop-index.component';
import { WebshopComponent } from './webshop.component';


@NgModule({
    imports: [
        WebshopRoutingModule,
        BitformModule,
        SharedModule,
        CommonModule,
        PipesModule
    ],
    declarations: [
        WebshopElementGroupFormComponent,
        FurnitureCategoriesComponent,
        WebshopElementFormComponent,
        WebshopItemCardComponent,
        WebshopElementsComponent,
        WebshopIndexComponent,
        WebshopComponent
  ],
})
export class WebshopModule { }
