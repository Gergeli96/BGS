import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot } from "@angular/router";
import { UserService } from "../services/user.service";
import { Injectable } from "@angular/core";

@Injectable({providedIn: 'root'})
export class AdminCanActivate implements CanActivate, CanActivateChild {

    constructor(
        private user: UserService,
        private router: Router
    ) { }


    public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        return this.canActivateCheck()
    }

    public canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        return this.canActivateCheck()
    }

    private canActivateCheck(): boolean {
        return true // this.user.loggedin

        // if (this.supabase.user == null) {
        //     this.router.navigateByUrl('')
        //     return false
        // }
        // else return true
    }
}
