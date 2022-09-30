import { DetailedGalerie, GalerieCarouselElement } from '../types/fileupload-types';
import { INavbarNavItem } from '../shared/navbar/navbar.component';
import { HttpService } from '../services/http.service';
import { IGalery } from '../types/galery-types';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-visitor',
    templateUrl: './visitor.component.html',
    styleUrls: ['./visitor.component.scss']
})
export class VisitorComponent {
    public currentYear: number = new Date().getFullYear()
    public images: GalerieCarouselElement[] = [ ]
    public cards = [
        {imgsrc: 'assets/planning.png', title: 'Első', content: 'Use our powerful mobile-first flexbox grid to build layouts of all shapes and sizes thanks to a twelve column system, six default responsive tiers, Sass variables and mixins, and dozens of predefined classes.'},
        {imgsrc: 'assets/implementation.png', title: 'Második', content: 'Use our powerful mobile-first flexbox grid to build layouts of all shapes and sizes thanks to a twelve column system, six default responsive tiers, Sass variables and mixins, and dozens of predefined classes.'},
        {imgsrc: 'assets/installation.png', title: 'Harmadik', content: 'Use our powerful mobile-first flexbox grid to build layouts of all shapes and sizes thanks to a twelve column system, six default responsive tiers, Sass variables and mixins, and dozens of predefined classes.'}
    ]
    public navItems: INavbarNavItem[] = [
        {text: 'Rólunk', onclick: () => this.scrollTo('welcome-about-us')},
        {text: 'Mit kínálunk', onclick: () => this.scrollTo('welcome-cards')},
        {text: 'Galéria', onclick: () => this.scrollTo('welcome-carousel')},
        {text: 'Webshop', onclick: () => this.router.navigateByUrl('/webshop')}
    ]

    constructor(
        private http: HttpService,
        private router: Router
    ) {
        this.getCardsData()
    }


    public scrollTo(elementId: string): void {
        document.querySelector(`app-visitor #${elementId}`)?.scrollIntoView()
    }

    private getCardsData(): void {
        this.http.get<IGalery[]>('galeries')
            .then(response => {
                this.images = response
                    .map(galerie => new DetailedGalerie(galerie))
                    .map(galerie => new GalerieCarouselElement(galerie)) ?? [ ]
            })
            .catch(error => { })
    }

    public navigateToGalerie(galerieId: number): void {
        this.router.navigateByUrl(`galeria/${galerieId}`)
    }
}
