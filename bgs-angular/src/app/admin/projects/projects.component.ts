import { BittableComponent } from 'src/app/bittable/bittable.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { IBitColumn } from 'src/app/bittable/bittable-types';
import { HttpService } from 'src/app/services/http.service';
import { IProject } from 'src/app/types/project-types';
import { Router } from '@angular/router';

@Component({
    selector: 'app-projects',
    templateUrl: './projects.component.html',
    styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
    @ViewChild(BittableComponent, {static: true}) table: BittableComponent
    public columns: IBitColumn[] = [
        {name: 'id', header: 'Id'},
        {name: 'name', header: 'Név'}
    ]

    constructor(
        private http: HttpService,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.table.tableFetch(() => this.http.get('projects'))
            .catch(error => { })
    }


    public navigateToProject(row: IProject): void {
        this.router.navigateByUrl(`/admin/project/${row.id}`)
    }

    private getProjects(): void {
        this.http.get('api/projects')
    }
}
