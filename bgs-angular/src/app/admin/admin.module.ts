import { BittableModule } from '../bittable/bittable.module';
import { AdminRoutingModule } from './admin-routing.module';
import { BitformModule } from '../bitform/bitform.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { GaleryUploadComponent } from './galery-upload/galery-upload.component';
import { GaleriesComponent } from './galeries/galeries.component';
import { ProjectsComponent } from './projects/projects.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { TestComponent } from './test/test.component';
import { AdminComponent } from './admin.component';


@NgModule({
    imports: [
        AdminRoutingModule,
        BittableModule,
        BitformModule,
        CommonModule,
        NgbModule
    ],
    declarations: [
        GaleryUploadComponent,
        GaleriesComponent,
        SidebarComponent,
        AdminComponent,
        TestComponent,
        ProjectsComponent
    ]
})
export class AdminModule { }
