import { HttpException, HttpStatus } from "@nestjs/common";

export class ModelValidationException extends HttpException {
    public errors: Map<string, string[]>

    constructor(message: string = null, errors?: Map<string, string[]>) {
        super(message, HttpStatus.BAD_REQUEST)
        this.errors = errors
    }
}
