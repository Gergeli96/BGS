import { BitType, IBitControl } from 'src/app/bitform/gitform-types';
import { BitformComponent } from 'src/app/bitform/bitform.component';
import { IRegistrationForm } from 'src/app/types/user-types';
import { HttpService } from 'src/app/services/http.service';
import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-registration',
    templateUrl: './registration.component.html',
    styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent {
    @ViewChild(BitformComponent, {static: true}) form: BitformComponent<IRegistrationForm>
    public controls: IBitControl<IRegistrationForm>[] = [
        {label: 'Felhasználónév', name: 'username'},
        {label: 'Email', name: 'email'},
        {label: 'Jelszó', name: 'password', type: BitType.password},
        {label: 'Jelszó mégegyszer', name: 'password2', type: BitType.password},
        {label: 'Kulcs', name: 'key'}
    ]

    constructor(
        private http: HttpService,
        private router: Router
    ) { }


    public registration(): void {
        this.form.submit(this.http.post('auth/register', this.form.value))
            .then(response => this.router.navigateByUrl('/auth/login'))
            .catch(error => { })
    }
}
