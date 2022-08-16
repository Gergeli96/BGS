import { IWhoAmI } from "../types/user-types";
import { Injectable } from "@angular/core";

@Injectable({providedIn: 'root'})
export class UserService {
    private TOKENKEY: string = 'token'
    public username: string | null = null
    public loggedin: boolean = false
    public id: number | null = null

    public get token(): string | null {
        return localStorage.getItem(this.TOKENKEY)
    }

    public logIn(user: IWhoAmI): void {
        if (user?.loggedin === true) {
            this.loggedin = user.loggedin
            this.username = user.username
            this.id = user.id

            localStorage.setItem(this.TOKENKEY, user.token ?? '')
        }
        else {
            this.logOut()
        }
    }

    public logOut(): void {
        localStorage.removeItem(this.TOKENKEY)
        this.loggedin = false
        this.username = null
        this.id = null
    }
}
