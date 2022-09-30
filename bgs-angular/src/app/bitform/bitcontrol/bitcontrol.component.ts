import { BitControl, BitType, IBitControl, IDatePickerValue } from '../gitform-types';
import { FileInputComponent } from '../file-input/file-input.component';
import { Component, Input, ViewChild } from '@angular/core';

@Component({
    selector: 'app-bitcontrol',
    templateUrl: './bitcontrol.component.html',
    styleUrls: ['./bitcontrol.component.scss']
})
export class BitcontrolComponent {
    @ViewChild(FileInputComponent, {static: false}) fileInputComponent: FileInputComponent
    public dateValue: IDatePickerValue
    public fileModelValue: any
    public control: BitControl
    public bittypes = BitType

    constructor() { }


    @Input('control')
    public set controlSetter(value: BitControl) {
        this.control = value
        
        if (value.type === BitType.longdate) {
            value.subscribeToValueChange(control => this.dateControlSubscription(control))
        }
        else if (value.type === BitType.file) {
            value.subscribeToValueChange(control => this.fileControlValueChange(control))
        }
    }

    public onFileSelect(files: FileList | null): void {
        this.control.value = files
    }

    public onDateValueChange(value: IDatePickerValue): void {
        this.control.value = `${value.year}-${this.extendDate(value.month)}-${this.extendDate(value.day)}`
    }

    private dateControlSubscription(control: IBitControl): void {
        const [year, month, day] = control.value.split('-')
        this.dateValue = {
            year: parseInt(year ?? 0),
            month: parseInt(month ?? 0),
            day: parseInt(day ?? 0)
        }
    }

    private fileControlValueChange(control: IBitControl): void {
        if (this.empty(control.value)) {
            this.fileInputComponent.setValue(null)
        }
    }

    private extendDate(value: number): string | number {
        return value >= 10 ? value : `0${value}`
    }

    private empty(value: any): boolean {
        return value === null || value === undefined || value === ''
    }
}
