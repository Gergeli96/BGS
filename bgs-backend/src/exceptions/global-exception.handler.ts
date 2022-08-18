import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { ModelValidationException } from './modelvalidation.exception';
import { Response } from 'express';

interface IExceptionErrorResponse {
    status: number
    message: string
    errors?: {[key: string]: string[]}
}

@Catch(HttpException)
export class GlobalExceptionHandler implements ExceptionFilter {

    public catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const status = exception.getStatus();

        const result: IExceptionErrorResponse = {
            message: exception.message,
            status: status,
        }

        if (exception instanceof ModelValidationException) {
            let errors = { }
            Array.from(exception.errors.keys()).forEach(key => {
                errors[key] = exception.errors.get(key)
            })
            result.errors = errors
        }

        response
            .status(status)
            .json(result)
    }
}
