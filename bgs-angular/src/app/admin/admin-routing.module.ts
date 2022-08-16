import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { GaleryUploadComponent } from './galery-upload/galery-upload.component';
import { GaleriesComponent } from './galeries/galeries.component';
import { ProjectsComponent } from './projects/projects.component';
import { TestComponent } from './test/test.component';
import { AdminComponent } from './admin.component';

import { AdminCanActivate } from './admin.guard';

const routes: Routes = [
    {
        path: '',
        component: AdminComponent,
        canActivate: [AdminCanActivate],
        canActivateChild: [AdminCanActivate],
        children: [
            {
                path: 'galeryupload',
                component: GaleryUploadComponent
            },
            {
                path: 'galeries',
                component: GaleriesComponent
            },
            {
                path: 'teszt',
                component: TestComponent
            },
            {
                path: 'projects',
                component: ProjectsComponent
            },
            {
                path: 'project',
                loadChildren: () => import('../project/project.module').then(mod => mod.ProjectModule)
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule { }
