import { AuthRoutingModule } from './auth-routing.module';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { LoginComponent } from './login/login.component';


@NgModule({
    imports: [
        AuthRoutingModule,
        CommonModule,
        FormsModule
    ],
    declarations: [
        LoginComponent
    ]
})
export class AuthModule { }
