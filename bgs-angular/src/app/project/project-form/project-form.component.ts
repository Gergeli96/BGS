import { RouterHelperService } from 'src/app/services/router-helper.service';
import { BitformComponent } from 'src/app/bitform/bitform.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { BitType, IBitControl } from 'src/app/bitform/gitform-types';
import { HttpService } from 'src/app/services/http.service';
import { ActivatedRoute, Router } from '@angular/router';
import { IProject } from 'src/app/types/project-types';
import { FormType } from 'src/app/types/common-types';

@Component({
    selector: 'app-project-form',
    templateUrl: './project-form.component.html',
    styleUrls: ['./project-form.component.scss']
})
export class ProjectFormComponent implements OnInit {
    @ViewChild(BitformComponent, {static: true}) form: BitformComponent<IProject>
    public controls: IBitControl<IProject>[] = [
        {label: 'Név', name: 'name'},
        {label: 'Megrendelő nee', name: 'customer'},
        {label: 'Megrendelő címe', name: 'customeradresse'},
        {label: 'Megrendelő telefon', name: 'customerphone'},
        {label: 'Határidő', name: 'deadline', type: BitType.longdate}
    ]
    public formtypes = FormType
    private projectId: number
    public type: FormType

    constructor(
        private routerHelper: RouterHelperService,
        private route: ActivatedRoute,
        private http: HttpService,
        private router: Router
    ) { }

    ngOnInit(): void {
        let routeData = this.routerHelper.getRouteData(this.route)
        this.type = routeData.formtype

        if (this.type == FormType.Edit) {
            this.projectId = parseInt(this.routerHelper.getRouteParamsMap(this.route).get('id') as any)
            this.getProjectAndSetFormValue()
        }
    }


    public save(): void {
        let body = this.form.value

        if (this.type == FormType.Edit) {
            body.id = this.projectId
            this.http.put('projects/update', body)
                .then(() => this.navigateToproject(this.projectId))
        }
        else {
            this.http.post<IProject>('projects/create', body)
                .then(response => this.navigateToproject(response.id))
        }
    }

    private navigateToproject(projectId: number): void {
        this.router.navigateByUrl(`/admin/project/${projectId}`)
    }

    private getProjectAndSetFormValue(): void {
        this.http.get<IProject>(`projects/${this.projectId}`)
            .then(response => this.form.setValue(response))
            .catch(error => { })
    }
}
