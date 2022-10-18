import { getControlDefaultValue } from "../helpers/form-helpers"
import { Accessor, createSignal, Setter } from "solid-js"

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
    number
}

export interface IBitControl<T = any> {
    label: string
    name: keyof T
    type?: BitControlType
    options?: ISelectOption[]
    value?: any
    onValueChange?: (value: any) => void
}

export interface IBitFormButton {
    onclick: (formValue: any) => void
    className: string
    name: string
}

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
    private optionsSetter: Setter<ISelectOption[]>
    public value: Accessor<any | undefined>
    private valueSetter: Setter<any>
    public label: string = ''
    public name: string = ''
    public type?: BitControlType

    constructor(public config: IBitControl) {
        let optionSignal = createSignal<ISelectOption[]>()
        this.options = optionSignal[0]
        this.optionsSetter = optionSignal[1]

        let valueSignal = createSignal<any>(getControlDefaultValue(config))
        this.value = valueSignal[0]
        this.valueSetter = valueSignal[1]

        if (Array.isArray(config.options)) this.setOptions(config.options)
        this.label = config.label
        this.name = config.name as string
        this.type = config.type
    }

    public setValue(value: any): void {
        this.valueSetter(value)
        if (this.config.onValueChange) this.config.onValueChange(value)
    }

    public setOptions(options: ISelectOption[], withEmpty: boolean = true): void {
        if (!Array.isArray(options)) options = [ ]
        if (withEmpty) options = [new SelectOption('Kérem válasszon', ''), ...options]

        this.optionsSetter(options)
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
}
