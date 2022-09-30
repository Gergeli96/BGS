import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FormContainerComponent } from './form-container/form-container.component';
import { DetailsComponent } from './details/details.component';
import { NavbarComponent } from './navbar/navbar.component';
import { CardComponent } from './card/card.component';


@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        FormContainerComponent,
        DetailsComponent,
        NavbarComponent,
        CardComponent
    ],
    exports: [
        FormContainerComponent,
        DetailsComponent,
        NavbarComponent,
        CardComponent
    ]
})
export class SharedModule { }
