import { Component, ElementRef, EventEmitter, HostListener, Output, ViewChild } from '@angular/core';

@Component({
    selector: 'file-input',
    templateUrl: './file-input.component.html',
    styleUrls: ['./file-input.component.scss']
})
export class FileInputComponent {
    @ViewChild('fileinput', {static: true}) fileInputRef: ElementRef<HTMLInputElement>
    @Output('filesSelected') public filesSelectedEmitter = new EventEmitter()
    public files: File[] = [ ]

    constructor() { }


    public get fileInput(): HTMLInputElement {
        return this.fileInputRef.nativeElement
    }

    public onClick(): void {
        this.fileInput.click()
    }

    public onFileinputChange(event: Event): void {
        const target = event?.target as HTMLInputElement
        this.setValue(target?.files)
    }

    @HostListener('drop', ['$event'])
    public onDrop(event: DragEvent): void {
        event.preventDefault(); event.stopPropagation()
        this.setValue(event.dataTransfer?.files)
    }

    @HostListener('dragover', ['$event'])
    @HostListener('dragleave', ['$event'])
    public preventEvent(event: Event): void {
        event.preventDefault(); event.stopPropagation()
    }

    public setValue(fileList: FileList | null | undefined): void {
        this.fileInput.files = null
        this.files = [ ]

        if (fileList instanceof FileList) {
            for (let i = 0; i < fileList.length; i++) {
                this.files.push(fileList.item(i) as File)
            }
        }

        this.filesSelectedEmitter.emit(fileList)
    }
}
