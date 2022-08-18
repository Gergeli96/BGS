import { BitType, IBitControl } from 'src/app/bitform/gitform-types';
import { BitformComponent } from 'src/app/bitform/bitform.component';
import { HttpService } from 'src/app/services/http.service';
import { Component, ViewChild } from '@angular/core';

interface IGaleryUploadForm {
    description: string
    files: FileList
    name: string
}

@Component({
    selector: 'app-galery-upload',
    templateUrl: './galery-upload.component.html',
    styleUrls: ['./galery-upload.component.scss']
})
export class GaleryUploadComponent {
    @ViewChild(BitformComponent, {static: true}) form: BitformComponent<IGaleryUploadForm>
    public controls: IBitControl<IGaleryUploadForm>[] = [
        {label: 'Név', name: 'name'},
        {label: 'Leírás', name: 'description', type: BitType.textarea},
        {label: 'Fileok', name: 'files', type: BitType.file}
    ]

    constructor(
        private http: HttpService
    ) { }


    public save(): void {
        const formValue = this.form.value
        const formData = new FormData()
        formData.set('name', formValue.name)
        formData.set('description', formValue.description)

        for (let i = 0; i < formValue.files.length; i++) {
            formData.append('files', formValue.files.item(i) as Blob)
        }

        this.form.submit(this.http.post('galeries/upload', formData))
            .then(response => this.form.empty())
            .catch(error => { })
    }
}
