import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { KeynavigatorDirective } from './keynavigator.directive';


@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        KeynavigatorDirective
    ],
    exports: [
        KeynavigatorDirective
    ]
})
export class DirectivesModule { }
