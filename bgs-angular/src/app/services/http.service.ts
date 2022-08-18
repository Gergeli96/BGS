import { HttpOptions, IHttpOptions } from '../types/http-types';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { SnotifyService } from './bgs-snotify.service';
import { UserService } from './user.service';
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class HttpService {

    constructor(
        private snotify: SnotifyService,
        private user: UserService,
        private http: HttpClient
    ) { }


    public get<T = any>(url: string, options?: IHttpOptions): Promise<T> {
        return this.makeRequest(this.http.get(this.getUrl(url), new HttpOptions(options, this.user.token) as any))
    }

    public post<T = any>(url: string, body: any, options?: IHttpOptions): Promise<T> {
        return this.snotify.async( 
            this.makeRequest(this.http.post(this.getUrl(url), body, new HttpOptions(options, this.user.token) as any))
        )
    }

    public put<T = any>(url: string, body: any, options?: IHttpOptions): Promise<T> {
        return this.snotify.async(
            this.makeRequest(this.http.put(this.getUrl(url), body, new HttpOptions(options, this.user.token) as any))
        )
    }

    public delete<T = any>(url: string, options?: IHttpOptions): Promise<T> {
        return new Promise((resolve, reject) => {
            if (confirm('Biztosan törölni szeretné?')) {
                this.snotify.async(
                    this.makeRequest(this.http.delete(this.getUrl(url), new HttpOptions(options, this.user.token) as any))
                )
                    .then(response => resolve(response))
                    .then(error => reject(error))
            }
            else {
                reject({ } as any)
            }
        })
    }

    private getUrl(urlPart: string): string {
        if (urlPart[0] === '/') urlPart = urlPart.slice(1)

        if (environment.production) {
            return '/api/' + urlPart
        }
        else {
            return 'http://localhost:3000/api/' + urlPart
        }
    }

    private makeRequest(observable: Observable<any>): Promise<any> {
        return new Promise((resolve, reject) => {
            observable.subscribe(
                (response: HttpResponse<any>) => resolve(response?.body),
                (error: HttpErrorResponse) => reject(error.error)
            )
        })
    }
}
