import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CalendarComponent } from './calendar.component';


@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        CalendarComponent
    ],
    exports: [
        CalendarComponent
    ]
})
export class CalendarModule { }
