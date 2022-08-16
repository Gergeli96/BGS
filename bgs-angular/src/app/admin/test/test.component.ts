import { SnotifyService, SnotifyType } from 'src/app/services/bgs-snotify.service';
import { Component } from '@angular/core';

@Component({
    selector: 'app-test',
    templateUrl: './test.component.html',
    styleUrls: ['./test.component.scss']
})
export class TestComponent {

    constructor(
        private snotify: SnotifyService
    ) { }


    public asyncEvent(success: boolean = true): void {
        const quickPromise = () => {
            return new Promise((resolve, reject) => {
                setTimeout(() => success ? resolve({ }) : reject(), 2000)
            })
        }

        this.snotify.async(quickPromise())
            .catch(error => { })
    }

    public addEvent(): void {
        this.snotify.addEvent({message: 'Próba', type: SnotifyType.async})
    }
}
