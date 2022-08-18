import { BitformComponent } from 'src/app/bitform/bitform.component';
import { BitType, IBitControl } from 'src/app/bitform/gitform-types';
import { AuthService } from 'src/app/services/auth.service';
import { ILoginForm } from 'src/app/types/user-types';
import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent {
    @ViewChild(BitformComponent, {static: true}) form: BitformComponent<ILoginForm>
    public controls: IBitControl<ILoginForm>[] = [
        {label: 'Felhasználónév', name: 'username'},
        {label: 'Jelszó', name: 'password', type: BitType.password}
    ]

    constructor(
        private auth: AuthService,
        private router: Router
    ) { }


    public login(event: Event): void {
        event.preventDefault()
        const loginData = this.form.value
        
        this.form.submit(this.auth.login(loginData.username, loginData.password))
            .then(response => {
                this.form.empty()
                this.router.navigateByUrl('admin/galeryupload')
            })
            .catch(error => { })
    }
}
