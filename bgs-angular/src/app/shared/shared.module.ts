import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NavbarComponent } from './navbar/navbar.component';
import { CardComponent } from './card/card.component';


@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        NavbarComponent,
        CardComponent
    ],
    exports: [
        NavbarComponent,
        CardComponent
    ]
})
export class SharedModule { }
