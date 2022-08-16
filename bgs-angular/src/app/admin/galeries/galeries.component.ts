import { DetailedGalerie, GalerieCarouselElement } from 'src/app/types/fileupload-types';
import { HttpService } from 'src/app/services/http.service';
import { IGalery } from 'src/app/types/galery-types';
import { Component } from '@angular/core';

@Component({
    selector: 'app-galeries',
    templateUrl: './galeries.component.html',
    styleUrls: ['./galeries.component.scss']
})
export class GaleriesComponent {
    public galeries: GalerieCarouselElement[] = [ ]

    constructor(
        private http: HttpService
    ) { 
        this.getGaleries()
    }


    private getGaleries(): void {
        this.http.get<IGalery[]>('galeries')
            .then(response => {
                this.galeries = response
                    .map(galerie => new DetailedGalerie(galerie))
                    .map(galerie => new GalerieCarouselElement(galerie)) ?? [ ]
            })
            .catch(error => { })
    }

    public delete(galerie: GalerieCarouselElement): void {
        this.http.delete(`galeries/delete/${galerie.id}`)
            .then(response => this.getGaleries())
            .catch(error => { })
    }
}
