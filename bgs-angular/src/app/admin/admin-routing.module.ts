import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { WebshopElementGroupFormComponent } from '../webshop/webshop-element-group-form/webshop-element-group-form.component';
import { WebshopElementFormComponent } from '../webshop/webshop-element-form/webshop-element-form.component';
import { GaleryUploadComponent } from './galery-upload/galery-upload.component';
import { CalendarComponent } from '../calendar/calendar.component';
import { GaleriesComponent } from './galeries/galeries.component';
import { ProjectsComponent } from './projects/projects.component';
import { TestComponent } from './test/test.component';
import { AdminComponent } from './admin.component';

import { AdminCanActivate } from './admin.guard';
import { WebshopElementsComponent } from '../webshop/webshop-elements/webshop-elements.component';

const routes: Routes = [
    {
        path: '',
        component: AdminComponent,
        canActivate: [AdminCanActivate],
        canActivateChild: [AdminCanActivate],
        children: [
            {
                path: 'calendar',
                component: CalendarComponent
            },
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
            },
            {
                path: 'webshop',
                children: [
                    {
                        path: 'createelementgroup',
                        component: WebshopElementGroupFormComponent
                    },
                    {
                        path: 'createelement',
                        component: WebshopElementFormComponent
                    },
                    {
                        path: 'elements',
                        component: WebshopElementsComponent
                    }
                ]
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule { }
