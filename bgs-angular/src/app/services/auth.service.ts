import { IWhoAmI } from "../types/user-types";
import { HttpService } from "./http.service";
import { UserService } from "./user.service";
import { Injectable } from "@angular/core";

@Injectable({providedIn: 'root'})
export class AuthService {

    constructor(
        private http: HttpService,
        private user: UserService
    ) { }


    public login(username: string, password: string): Promise<IWhoAmI> {
        return new Promise((resolve, reject) => {
            this.http.post<IWhoAmI>('auth/login', {username: username, password: password})
                .then(response => {
                    this.user.logIn(response)
                    resolve(response)
                })
                .catch(error => {
                    this.user.logOut()
                    reject(error)
                })
        })
    }

    public refreshUser(): Promise<void> {
        return new Promise(resolve => {
            this.http.get<IWhoAmI>('auth/resfresh')
                .then(response => {
                    this.user.logIn(response)
                    resolve()   
                })
                .catch(error => {
                    this.user.logOut()
                    resolve()
                })
        })
    }
}
