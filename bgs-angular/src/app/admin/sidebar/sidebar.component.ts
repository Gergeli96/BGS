import { UserService } from 'src/app/services/user.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {

    constructor(
        public user: UserService,
        private router: Router
    ) { }


    public preventDefault(event: Event): void {
        event.preventDefault()
    }

    public signOut(): void {
        this.user.logOut()
        this.router.navigateByUrl('/')
    }
}
