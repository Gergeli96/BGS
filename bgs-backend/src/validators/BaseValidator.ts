import { ModelValidationException } from "src/exceptions/modelvalidation.exception"
import { IKeyOf } from "src/general-types/general-types"
import { IMulterFile } from "src/interfaces/file.interfaces"

export class BaseValidator<T> {
    private errors = new Map<IKeyOf<T>, string[]>()

    constructor(private model: T) {

    }


    public validate(): void {
        let keys = Array.from(this.errors.keys())

        keys.forEach(key => {
            if (this.errors.get(key).length < 1) this.errors.delete(key)
        })

        keys = Array.from(this.errors.keys())

        if (keys.length > 0) {
            throw new ModelValidationException('', this.errors as Map<string, string[]>)
        }
    }

    protected ruleFor(key: IKeyOf<T>, validatorCallback: (model: T) => boolean, message: string): void {
        if (validatorCallback(this.model)) {
            this.setError(key, message)
        }
    }

    protected hasFiles(files: IMulterFile[]): void {
        if (!Array.isArray(files) || files?.length < 1) {
            this.setError('files' as any, 'Legalább egy file kötelező!')
        }
    }

    private setError(key: IKeyOf<T>, message: string): void {
        if (!this.errors.has(key)) {
            this.errors.set(key, [ ])
        }

        this.errors.get(key).push(message)
    }
}
