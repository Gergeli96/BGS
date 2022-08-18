import { HttpException, HttpStatus } from "@nestjs/common";

export class BadRequest extends HttpException {

    constructor(message: string = null) {
        super(message, HttpStatus.BAD_REQUEST)
    }

}
