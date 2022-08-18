export enum BitType {
    text,
    textarea,
    checkbox,
    select,
    file,
    number,
    longdate,
    password
}

export interface IDatePickerValue {
    month: number
    year: number
    day: number
}

export interface ISelectOption {
    value: any
    name: string 
}

export type IBitControlValueChangeSubscription = (control: IBitControl) => void

export interface IBitControl<T = any> {
    label: string
    name: keyof T
    type?: BitType
    options?: ISelectOption[]
    value?: any
}

export class BitControl<T = any> {
    private subscriptions: IBitControlValueChangeSubscription[] = [ ]
    public options: ISelectOption[]
    public errors: string[] = [ ]
    public label: string
    public name: keyof T
    public type: BitType
    public _value: any

    constructor(private model: IBitControl<T>) {
        this.label = model.label
        this.name = model.name
        this.type = model.type ?? BitType.text
        this.options = Array.isArray(model.options) ? model.options : [ ]
        this.value = model.value
    }


    public get value(): any {
        switch (this.model.type) {
            case BitType.checkbox:
                return typeof this._value == 'boolean' ? this._value : false
            case BitType.number:
                return this._value
        
            default:
                return this._value
        }
    }

    public set value(data: any) {
        switch (this.model.type) {
            case BitType.checkbox:
                this._value = typeof data == 'boolean' ? data : false
                break
            case BitType.number:
                this._value = data
                break
            case BitType.longdate:
                this._value = data?.replace(/\./g, '-').substr(0, 10)
                break
        
            default:
                this._value = data
                break
        }

        this.subscriptions.forEach(sub => sub(this))
    }

    public setValue(value: any): void {
        this.value = value
    }

    public empty(): void {
        this.value = null
    }

    public subscribeToValueChange(subcription: IBitControlValueChangeSubscription): void {
        this.subscriptions.push(subcription)
    }

    public setErrors(errors: string[]): void {
        if (!Array.isArray(errors)) errors = [ ]
        this.errors = errors
    }
}
