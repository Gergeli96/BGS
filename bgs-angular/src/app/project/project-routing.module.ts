import { ProjectFormComponent } from './project-form/project-form.component';
import { RouterModule, Routes } from '@angular/router';
import { ProjectComponent } from './project.component';
import { FormType } from '../types/common-types';
import { NgModule } from '@angular/core';

const routes: Routes = [
    {
        path: 'create',
        component: ProjectFormComponent,
        data: {formtype: FormType.Create}
    },
    {
        path: 'edit/:id',
        component: ProjectFormComponent,
        data: {formtype: FormType.Edit}
    },
    {
        path: '',
        component: ProjectComponent,
        children: [
            {
                path: ':id',
                component: ProjectComponent
            },
        ]
    }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectRoutingModule { }
