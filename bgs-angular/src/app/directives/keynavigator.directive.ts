import { Directive, ElementRef } from '@angular/core';

interface IKeyNavigationListElement {
    previous: HTMLInputElement | undefined
    element: HTMLInputElement
    next: HTMLInputElement | undefined
}

@Directive({
    selector: '[keynavigator]'
})
export class KeynavigatorDirective {

    constructor(
        private element: ElementRef<HTMLElement>
    ) { }

    ngAfterViewInit(): void {
        this.setEventListeners()
        this.focusToFirstElement()
    }


    private get hostElement(): HTMLElement {
        return this.element.nativeElement
    }

    private getAllNavigatableElement(): Array<HTMLInputElement> {
        return Array.from(this.hostElement.querySelectorAll('[focusable], div[bitformfooter] button'))
    }

    private focusToFirstElement(): void {
        let elements = this.getAllNavigatableElement()
        if (elements.length > 0) {
            elements[0].focus()
        }
    }

    private createLinkedList(): Array<IKeyNavigationListElement> {
        let elements = this.getAllNavigatableElement()
        
        return elements.map((element, index) => {
            return {
                previous: elements[index - 1],
                element: element,
                next: elements[index + 1]
            }
        })
    }

    private setEventListeners(): void {
        this.createLinkedList()
            .forEach(element => {
                element.element.addEventListener('keydown', e => {
                    switch (e.which) {
                        case 38: // Felfelé
                            this.modeUp(element, e)
                            break;
                        case 40: // Lefelé
                            this.modeDown(element, e)
                            break;
                        case 13: // Enter
                            this.modeDown(element, e)
                            break;
                    }
                })
            })
    }

    private modeUp(listElement: IKeyNavigationListElement, event: Event): void {
        if (listElement.element.nodeName !== 'TEXTAREA') {
            if (listElement.previous) {
                event.preventDefault()
                listElement.previous.focus()
            }
        }
    }

    private modeDown(listElement: IKeyNavigationListElement, event: KeyboardEvent): void {
        if (listElement.element.nodeName !== 'TEXTAREA' && listElement.next) {
            if (event.which == 13 && listElement.element.nodeName == 'BUTTON') {
                event.preventDefault()
                listElement.element.click()
            }
            else {
                event.preventDefault()
                listElement.next.focus()
            }
        }
    }
}
