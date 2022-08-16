import { RouterHelperService } from '../services/router-helper.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from '../services/http.service';
import { Component, OnInit } from '@angular/core';
import { IProject } from '../types/project-types';

@Component({
    selector: 'app-project',
    templateUrl: './project.component.html',
    styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {
    public projectId: number = 0
    public project: IProject

    constructor(
        private routerHelper: RouterHelperService,
        private route: ActivatedRoute,
        private http: HttpService,
        private router: Router
    ) { }
    
    ngOnInit(): void {
        this.getProject()
    }


    public navigateToProjectEditForm(): void {
        this.router.navigateByUrl(`/admin/project/edit/${this.projectId}`)
    }

    public deleteProject(): void {
        if (confirm(`Biztosan törölni szeretné a ${this.project.name} nevű projektet?`)) {
            this.http.delete(`projects/delete/${this.projectId}`)
                .then(() =>this.router.navigateByUrl('/admin/projects'))
                .catch(error => { })
        }
    }

    private getProject(): void {
        this.projectId = parseInt(this.routerHelper.getRouteParamsMap(this.route).get('id') ?? '0')

        this.http.get<IProject>(`projects/detailed/${this.projectId}`)
            .then(response => this.project = response)
            .catch(error => { })
    }
}
