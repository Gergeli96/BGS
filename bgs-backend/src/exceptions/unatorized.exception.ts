import { HttpException, HttpStatus } from "@nestjs/common";

export class UnathorizedException extends HttpException {

    constructor(message: string = '') {
        super(message, HttpStatus.UNAUTHORIZED)
    }

}
