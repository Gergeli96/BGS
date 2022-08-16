export interface IBitColumn<T = any> {
    name: keyof T
    header: string
    renderer?: (row: T, column: IBitColumn<T>) => any
    style?: (row: T, column: IBitColumn<T>) => any
    width?: string
}

export interface ICellClickEvent<T = any> {
    column: IBitColumn<T>
    event: MouseEvent
    row: T
}
