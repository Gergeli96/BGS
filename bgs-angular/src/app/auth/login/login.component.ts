import { AuthService } from 'src/app/services/auth.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent {
    public authData = {
        password: '',
        email: ''
    }

    constructor(
        private auth: AuthService,
        private router: Router
    ) { }


    public login(event: Event): void {
        event.preventDefault()
        
        this.auth.login(this.authData.email, this.authData.password)
            .then(response => {
                    this.authData.password = ''
                    this.authData.email = ''
                    this.router.navigateByUrl('admin/galeryupload')
                })
                .catch(error => { })
    }

    public register(event: Event): void {
        event.preventDefault()
        // this.supabase.signUp(this.authData.email, this.authData.password)
    }
}
