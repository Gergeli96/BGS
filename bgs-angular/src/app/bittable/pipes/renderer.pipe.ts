import { Pipe, PipeTransform } from '@angular/core';
import { IBitColumn } from '../bittable-types';

@Pipe({
    name: 'renderer'
})
export class RendererPipe implements PipeTransform {

    transform(column: IBitColumn, row: any): any {
        if (column.renderer) {
            return column.renderer(column, row)
        }
        else {
            return row[column.name]
        }
    }

}
