import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

const routes: Routes = [
	{
		path: '',
		loadChildren: () => import('./visitor/visitor.module').then(mod => mod.VisitorModule)
	},
	{
		path: 'auth',
		loadChildren: () => import('./auth/auth.module').then(mod => mod.AuthModule)
	},
	{
		path: 'admin',
		loadChildren: () => import('./admin/admin.module').then(mod => mod.AdminModule)
	}
]

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
