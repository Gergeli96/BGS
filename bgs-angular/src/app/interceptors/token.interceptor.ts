import { HttpHeaders, HttpHandler, HttpRequest, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { UserService } from '../services/user.service';
import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';

@Injectable()
export class TokenHttpInterceptor implements HttpInterceptor {

    constructor(
        private user: UserService
    ) { }


    public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return from(this.handleAccess(request, next));
    }

    private async handleAccess(request: HttpRequest<any>, next: HttpHandler): Promise<HttpEvent<any>> {
        const token = this.user.token
        let changedRequest = request

        const headerSettings: { [name: string]: string | string[]; } = { }

        for (const key of request.headers.keys()) {
            headerSettings[key] = request.headers.getAll(key) as any
        }
        if (token) {
            headerSettings['Authorization'] = 'Bearer ' + token
            headerSettings['Access-Control-Allow-Origin'] = '* '
        }

        headerSettings['Content-Type'] = 'application/json'
        const newHeader = new HttpHeaders(headerSettings)

        changedRequest = request.clone({
            headers: newHeader
        })

        return next.handle(changedRequest).toPromise() as Promise<HttpEvent<any>>
    }

}
