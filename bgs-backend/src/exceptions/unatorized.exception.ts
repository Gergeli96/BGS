import { HttpException, HttpStatus } from "@nestjs/common";

export class UnathorizedException extends HttpException {

    constructor(message: string = null) {
        super(message, HttpStatus.UNAUTHORIZED)
    }

}
