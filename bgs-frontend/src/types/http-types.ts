export interface IHttpError {
    errors?: {[key: string]: string[]}
}

export class HttpError extends Error implements IHttpError {
    public errors?: { [key: string]: string[] }

    constructor(message: string, error: IHttpError) {
        super(message)
        this.errors = error.errors ? error.errors : { }
    }

}
