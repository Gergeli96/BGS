import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { GaleriesComponent } from './galeries/galeries.component';
import { GalerieComponent } from './galerie/galerie.component';
import { VisitorComponent } from './visitor.component';

const routes: Routes = [
    {
        path: '',
        component: VisitorComponent
    },
    {
        path: 'galeria/:id',
        component: GalerieComponent
    },
    {
        path: 'galeriak',
        component: GaleriesComponent
    }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VisitorRoutingModule { }
