import { getControlDefaultValue } from "../helpers/form-helpers"
import { Accessor, createSignal, Setter } from "solid-js"
import { IJsxElement } from "../types/general-types"
import { IHttpError } from "../types/http-types"

export interface ISelectOption {
    name: string
    value: any
}

export enum BitControlType {
    text,
    select,
    checkbox,
    file,
    textarea,
    number,
    password
}

export interface IBitControl<T = any> {
    label: string
    name: keyof T
    type?: BitControlType
    options?: ISelectOption[]
    value?: any
    onValueChange?: (value: any) => void
    suffix?: string | IJsxElement
}

export interface IBitFormButton {
    onclick: (formValue: any) => void
    className: string
    name: string
}

export type IControlSubscription = (value: any) => void

export class SelectOption implements ISelectOption {
    public name: string
    public value: any

    constructor(name: string, value: any) {
        this.value = value
        this.name = name
    }
}

export class BitControl implements Omit<IBitControl, 'options'> {
    public options: Accessor<ISelectOption[] | undefined>
    private subscriptions: IControlSubscription[] = [ ]
    private optionsSetter: Setter<ISelectOption[]>
    public value: Accessor<any | undefined>
    private valueSetter: Setter<any>
    public label: string = ''
    public name: string = ''
    public type?: BitControlType
    suffix?: string | IJsxElement

    public errors: Accessor<string[] | undefined>
    private errorsSetter: Setter<string[]>

    constructor(public config: IBitControl) {
        let optionSignal = createSignal<ISelectOption[]>()
        this.options = optionSignal[0]
        this.optionsSetter = optionSignal[1]

        let valueSignal = createSignal<any>(getControlDefaultValue(config))
        this.value = valueSignal[0]
        this.valueSetter = valueSignal[1]

        let errorSignal = createSignal<string[]>([])
        this.errors = errorSignal[0]
        this.errorsSetter = errorSignal[1]

        if (Array.isArray(config.options)) this.setOptions(config.options)
        this.label = config.label
        this.name = config.name as string
        this.type = config.type
        this.suffix = config.suffix
    }

    public setValue(value: any): void {
        this.valueSetter(value)
        if (this.config.onValueChange) this.config.onValueChange(value)
        this.subscriptions.forEach(subscription=> subscription(value))
    }

    public setOptions(options: ISelectOption[], withEmpty: boolean = true): void {
        if (!Array.isArray(options)) options = [ ]
        if (withEmpty) options = [new SelectOption('Kérem válasszon', ''), ...options]

        this.optionsSetter(options)
    }

    public subscribe(subscription: IControlSubscription): void {
        this.subscriptions.push(subscription)
    }

    public setError(error: string | string[]): void {
        if (error === null || error === undefined || error?.length === 0) {
            this.errorsSetter([])
        }
        else {   
            if (typeof error === 'string') error = [error]
            this.errorsSetter(error as string[])
        }
    }
}

export class BitControlGroup<T = any> {
    public controls: BitControl[] = [ ]

    constructor(controls: IBitControl<T>[]) {
        this.controls = controls.map(c => new BitControl(c))
    }

    public get(name: keyof T): BitControl | undefined {
        return this.controls.find(x => x.name == name)
    }

    public get value(): T {
        return this.controls.reduce((formvalue, control) => {
            formvalue[control.name] = control.value()
            return formvalue
        }, { } as any) as T
    }

    public get valueAsFormData(): FormData {
        const formData = new FormData()

        this.controls.forEach(control => {
            let controlValue = control.value()

            if (control.type == BitControlType.file && Array.isArray(controlValue)) {
                controlValue.forEach(file => formData.append('files', file as Blob))
            }
            else {
                formData.set(control.name, `${controlValue}`)
            }
        })

        return formData
    }

    public setValue(value: T): void {
        this.controls.forEach(control => control.setValue((value as any)[control.name] ?? getControlDefaultValue(control.config)))
    }

    public empty(): void {
        this.controls.forEach(control => control.setValue(getControlDefaultValue(control.config)))
    }

    public save<T>(callback: Promise<any>): Promise<T> {
        this.controls.forEach(x => x.setError([]))

        return new Promise((resolve, reject) => {
            callback
                .then(response => resolve(response))
                .catch((error: IHttpError) => {
                    if (error.errors) {
                        Object.keys(error.errors)
                            .forEach(key => this.get(key as any)?.setError((error.errors as any)[key]))
                    }
                    reject(error)
                })
        })
    }
}
