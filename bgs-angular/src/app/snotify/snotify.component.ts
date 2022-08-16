import { SnotifyService } from '../services/bgs-snotify.service';
import { Component } from '@angular/core';

@Component({
    selector: 'app-snotify',
    templateUrl: './snotify.component.html',
    styleUrls: ['./snotify.component.scss']
})
export class SnotifyComponent {

    constructor(
        public snotify: SnotifyService
    ) { }

}
