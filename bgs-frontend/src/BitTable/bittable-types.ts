import { Accessor, createSignal, Setter } from "solid-js"
import { IJsxElement } from "../types/general-types"

export enum BitColumnType {
    text = 'text',
    number = 'number'
}

export interface IBitColumn<T = any> {
    render?: (column: IBitColumn, row: T) => IJsxElement
    header: string
    name: keyof T
    style?: any
    type?: BitColumnType
    width?: string
}

export class BitColumnGroup<T = any> {
    public columns: IBitColumn[] = [ ]
    public data: Accessor<T[] | undefined>
    private dataSetter: Setter<T[]>
    public activeRow: T | undefined

    constructor(columns: IBitColumn<T>[]) {
        let optionSignal = createSignal<T[]>()
        this.data = optionSignal[0]
        this.dataSetter = optionSignal[1]

        this.columns = columns
    }

    public setData(data: T[]): void {
        this.dataSetter(data)
    }

    public dataFetch(callback: () => Promise<T[]>): void {
        callback()
            .then(response => this.setData(response))
            .catch(error => { })
    }
}
