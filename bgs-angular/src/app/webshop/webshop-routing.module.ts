import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { WebshopIndexComponent } from './webshop-index/webshop-index.component';
import { WebshopComponent } from './webshop.component';

const routes: Routes = [
    {
        path: '',
        component: WebshopComponent,
        children: [
            {
                path: '',
                redirectTo: 'index'
            },
            {
                path: 'index',
                component: WebshopIndexComponent
            }
        ]
    },
    // {
    //     path: 'index',
    //     component: WebshopComponent
    // }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class WebshopRoutingModule { }
