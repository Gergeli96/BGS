import { HttpContext, HttpHeaders, HttpParams } from "@angular/common/http";

export interface IHttpOptions {
    headers?: HttpHeaders | {
        [header: string]: string | string[];
    };
    context?: HttpContext
    observe?: 'body' | 'events' | 'response'
    params?: HttpParams | {
        [param: string]: string | number | boolean | ReadonlyArray<string | number | boolean>;
    };
    reportProgress?: boolean;
    responseType?: 'json'
    withCredentials?: boolean;
}

export class HttpOptions implements IHttpOptions {
    public headers?: HttpHeaders | {
        [header: string]: string | string[]
    }
    public context?: HttpContext
    public observe?: 'body' | 'events' | 'response' = 'response'
    public params?: HttpParams | {
        [param: string]: string | number | boolean | ReadonlyArray<string | number | boolean>
    }
    public reportProgress?: boolean = false
    public responseType?: 'json' = 'json'
    public withCredentials?: boolean = true

    constructor(options: IHttpOptions | undefined, authToken: string | null) {
        if (options?.headers instanceof HttpHeaders) this.headers = options.headers
        // else this.headers = new HttpHeaders()
        else delete this.headers
        if (options?.context instanceof HttpContext) this.context = options.context
        else delete this.context
        if (options?.params instanceof HttpParams) this.params = options.params
        else delete this.params

        if (typeof authToken === 'string') {
            if (!this.headers) {
                this.headers = new HttpHeaders()
            }

            this.headers = this.headers.set('Authorization', `Bearer ${authToken}`)
        }
    }
}
