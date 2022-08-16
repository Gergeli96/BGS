import { INavbarNavItem } from 'src/app/shared/navbar/navbar.component';
import { HttpService } from 'src/app/services/http.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, ElementRef } from '@angular/core';
import { IGalery } from 'src/app/types/galery-types';

@Component({
    selector: 'app-galerie',
    templateUrl: './galerie.component.html',
    styleUrls: ['./galerie.component.scss']
})
export class GalerieComponent {
    public gallery: IGalery
    public navItems: INavbarNavItem[] = [
        {text: 'Kezdő oldal', onclick: () => this.navigateTo('/')},
        {text: 'Galériák', onclick: () => this.navigateTo('/galeriak')}
    ]

    constructor(
        private hostelement: ElementRef<HTMLElement>,
        private route: ActivatedRoute,
        private http: HttpService,
        private router: Router
    ) { 
        this.getGaleries()
    }


    public zoomInOnImage(imgElement: HTMLImageElement | null, step: boolean = false): void {
        if (step) {
            this.hostelement.nativeElement.querySelector('img.zoom')?.classList?.remove('zoom')
        }

        if (imgElement) {
            if (imgElement.classList.contains('zoom')) {
                imgElement.classList.remove('zoom')
            }
            else {
                imgElement.classList.add('zoom')
            }
        }

        const zoomedImg = this.hostelement.nativeElement.querySelector('img.zoom')
        const galleryContainer = this.hostelement.nativeElement.querySelector('.galerie-container')

        if (zoomedImg) {
            galleryContainer?.classList.add('zoom')
        }
        else {
            galleryContainer?.classList.remove('zoom')
        }
    }

    public step(direction: 1 | -1): void {
        let activeIndex = this.hostelement.nativeElement.querySelector('img.zoom')?.getAttribute('index')
        let nextIndex = parseInt(activeIndex as any) + direction

        if (nextIndex < 0) nextIndex = this.gallery.files.length -1
        else if (nextIndex > this.gallery.files.length -1) nextIndex = 0

        let nextImg = this.hostelement.nativeElement.querySelector<HTMLImageElement>(`img[index="${nextIndex}"]`)

        this.zoomInOnImage(nextImg, true)
    }

    private getGaleries(): void {
        this.http.get<IGalery[]>('galeries')
            .then(response => {
                const galerieId: number = parseInt(this.route.snapshot.params['id']) ?? 0
                let x = response.find(g =>g.id == galerieId) as IGalery
                x.files = [...x.files, ...x.files, ...x.files, ...x.files]
                this.gallery = x
            })
            .catch(error => { }) 
    }

    private navigateTo(route: string): void {
        this.router.navigateByUrl(route)
    }
}
