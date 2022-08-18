import { AuthRoutingModule } from './auth-routing.module';
import { BitformModule } from '../bitform/bitform.module';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';


@NgModule({
    imports: [
        AuthRoutingModule,
        BitformModule,
        CommonModule,
        FormsModule
    ],
    declarations: [
        RegistrationComponent,
        LoginComponent
    ]
})
export class AuthModule { }
