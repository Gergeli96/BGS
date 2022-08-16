import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IBitColumn, ICellClickEvent } from './bittable-types';

@Component({
    selector: 'app-bittable',
    templateUrl: './bittable.component.html',
    styleUrls: ['./bittable.component.scss']
})
export class BittableComponent<T = any> {
    @Output('cellclick') public cellClickEmitter = new EventEmitter<ICellClickEvent>()
    @Output('rowclick') public rowClickEmitter = new EventEmitter<T>()
    public _columns: IBitColumn[] = [ ]
    public _tabledata: any[] = [ ]

    constructor() { }


    @Input('columns')
    public set columnsSetter(data: IBitColumn[]) {
        this._columns = data
    }

    public onRowClick(row: T): void {
        this.rowClickEmitter.emit(row)
    }

    public onCellClick(event: MouseEvent, column: IBitColumn, row: T): void {
        this.cellClickEmitter.emit({event: event, column: column, row: row})
    }

    public tableFetch<T = any>(callback: () => Promise<T>): Promise<T> {
        return new Promise((resolve, reject) => {
            callback()
                .then((response: any) => {
                    this._tabledata = response
                    resolve(response)
                })
                .catch(error => reject(error))
        })
    }
}
