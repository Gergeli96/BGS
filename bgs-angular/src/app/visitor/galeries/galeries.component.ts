import { INavbarNavItem } from 'src/app/shared/navbar/navbar.component';
import { HttpService } from 'src/app/services/http.service';
import { IGalery } from 'src/app/types/galery-types';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-galeries',
    templateUrl: './galeries.component.html',
    styleUrls: ['./galeries.component.scss']
})
export class GaleriesComponent implements OnInit {
    public navItems: INavbarNavItem[] = [
        {text: 'Kezdő oldal', onclick: () => this.router.navigateByUrl('/')}
    ]
    public galeries: IGalery[] = [ ]

    constructor(
        private http: HttpService,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.getGaleries()
    }


    private getGaleries(): void {
        this.http.get<IGalery[]>('galeries')
            .then(response => {
                this.galeries = response.filter(g => g.files?.length > 0)
            })
            .catch(error => { })
    }

}
