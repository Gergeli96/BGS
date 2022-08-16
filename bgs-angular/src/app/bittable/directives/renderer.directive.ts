import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { IBitColumn } from '../bittable-types';

@Directive({
  selector: '[renderer]'
})
export class RendererDirective {
    private column: IBitColumn
    private row: any

    constructor(
        private hostelement: ElementRef<HTMLElement>,
        private sanitizer: DomSanitizer,
        private renderer: Renderer2
    ) { }


    @Input('column')
    public set columnSetter(column: IBitColumn) {
        this.column = column
        this.render()
    }
    
    @Input('row')
    public set rowSetter(row: any) {
        this.row = row
        this.render()
    }

    private render(): void {
        if (this.column && this.row) {
            if (this.column.renderer) {
                const innerHtml = '' + this.column.renderer(this.column, this.row)
                this.hostelement.nativeElement.innerHTML = (this.sanitizer.bypassSecurityTrustHtml(innerHtml) as any).changingThisBreaksApplicationSecurity
            }
            else {
                this.hostelement.nativeElement.innerHTML = this.row[this.column.name]
            }

            if (this.column.style) {
                let style = this.column.style(this.row, this.column)
                Object.keys(style).forEach(key => this.renderer.setStyle(this.hostelement.nativeElement, key, style[key]))
            }
        }
    }
}
