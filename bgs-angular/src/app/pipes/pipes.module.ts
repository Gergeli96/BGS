import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { DriveImgPipe } from './drive-img.pipe';


@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        DriveImgPipe
    ],
    exports: [
        DriveImgPipe
    ]
})
export class PipesModule { }
