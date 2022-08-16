import { ProjectRoutingModule } from './project-routing.module';
import { BittableModule } from '../bittable/bittable.module';
import { BitformModule } from '../bitform/bitform.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { ProjectFormComponent } from './project-form/project-form.component';
import { NotesComponent } from './notes/notes.component';
import { ProjectComponent } from './project.component';
import { BillComponent } from './bill/bill.component';


@NgModule({
    imports: [
        ProjectRoutingModule,
        BittableModule,
        BitformModule,
        CommonModule,
        FormsModule,
        NgbModule
    ],
    declarations: [
        ProjectFormComponent,
        ProjectComponent,
        NotesComponent,
        BillComponent
  ]
})
export class ProjectModule { }
