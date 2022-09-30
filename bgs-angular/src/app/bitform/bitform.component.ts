import { BitControl, IBitControl } from './gitform-types';
import { IHttpErrorResponse } from '../types/http-types';
import { Component, Input } from '@angular/core';

@Component({
    selector: 'bitform',
    templateUrl: './bitform.component.html',
    styleUrls: ['./bitform.component.scss']
})
export class BitformComponent<T = any> {
    public controls: BitControl<T>[]

    constructor() { }


    @Input('controls')
    public set controlsSetter(value: IBitControl[]) {
        if (!Array.isArray(value)) {
            this.controls = [ ]
        }
        else {
            this.controls = value.map(control => new BitControl(control))
        }
    }

    public get value(): T {
        return this.controls.reduce((value: any, control) => {
            value[control.name] = control.value
            return value
        }, { }) as T
    }

    public setValue(value: T): void {
        this.controls.forEach(control => control.setValue(value[control.name]))
    }

    public get(name: keyof T): BitControl | null {
        return this.controls?.find(c => c.name == name) ?? null
    }

    public empty(): void {
        this.controls?.forEach(control => control.empty())
    }

    public submit(promise: Promise<any>): Promise<any> {
        return new Promise((resolve, reject) => {
            promise
                .then(response => resolve(response))
                .catch((error: IHttpErrorResponse) => {
                    console.log(error)
                    if (error.errors) {
                        const errors = error.errors as {[key: string]: string[]}
                        console.log(errors)
                        this.controls.forEach(control => {
                            console.log(errors[control.name as string])
                            if (errors[control.name as string]) control.setErrors(errors[control.name as string])
                        })
                    }

                    reject(error)
                })
        })
    }
}
