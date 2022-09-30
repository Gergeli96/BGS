import { ISelectOption } from "../bitform/gitform-types";

export class SelectOption implements ISelectOption {
    public name: string
    public value: any

    constructor(name: string, value: any) {
        this.value = value
        this.name = name
    }
}
