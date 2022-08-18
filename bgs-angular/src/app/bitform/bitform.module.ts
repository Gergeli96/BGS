import { DirectivesModule } from '../directives/directives.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { BitcontrolComponent } from './bitcontrol/bitcontrol.component';
import { BitformComponent } from './bitform.component';


@NgModule({
    imports: [
        DirectivesModule,
        CommonModule,
        FormsModule,
        NgbModule
    ],
    declarations: [
        BitcontrolComponent,
        BitformComponent
    ],
    exports: [
        BitformComponent
    ]
})
export class BitformModule { }
