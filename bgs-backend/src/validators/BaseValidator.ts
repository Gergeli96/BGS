import { ModelValidationException } from "src/exceptions/modelvalidation.exception"
import { IKeyOf } from "src/general-types/general-types"

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

    private setError(key: IKeyOf<T>, message: string): void {
        if (!this.errors.has(key)) {
            this.errors.set(key, [ ])
        }

        this.errors.get(key).push(message)
    }
}
