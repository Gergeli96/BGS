import { VisitorRoutingModule } from './visitor-routing.module';
import { SharedModule } from '../shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { GaleriesComponent } from './galeries/galeries.component';
import { GalerieComponent } from './galerie/galerie.component';
import { VisitorComponent } from './visitor.component';

import { PipesModule } from '../pipes/pipes.module';


@NgModule({
    imports: [
        VisitorRoutingModule,
        SharedModule,
        CommonModule,
        PipesModule,
        NgbModule
    ],
    declarations: [
        GaleriesComponent,
        VisitorComponent,
        GalerieComponent
    ]
})
export class VisitorModule { }
