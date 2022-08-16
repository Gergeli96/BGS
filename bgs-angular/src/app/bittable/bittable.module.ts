import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { BittableComponent } from './bittable.component';
import { RendererPipe } from './pipes/renderer.pipe';
import { SafeInnerHtmlDirective } from './directives/safe-inner-html.directive';
import { RendererDirective } from './directives/renderer.directive';


@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        BittableComponent,
        RendererPipe,
        SafeInnerHtmlDirective,
        RendererDirective
    ],
    exports: [
        BittableComponent
    ]
})
export class BittableModule { }
