import { HttpService } from 'src/app/services/http.service';
import { Component, Input } from '@angular/core';
import { INote } from 'src/app/types/note-types';

@Component({
    selector: 'app-notes',
    templateUrl: './notes.component.html',
    styleUrls: ['./notes.component.scss']
})
export class NotesComponent {
    public noteContent: string = ''
    private projectId: number = 0
    public _notes: INote[] = [ ]

    constructor(
        private http: HttpService
    ) { }


    @Input('projectid')
    public set projectIdSetter(projectid: number) {
        this.projectId = projectid
        this.getNotes()
    }

    public createNote(): void {
        let note: INote = {
            content: this.noteContent,
            project_id: this.projectId
        }

        this.http.post('notes/create', note)
            .then(response => {
                this.noteContent = ''
                this.getNotes()
            })
            .catch(error => { })
    }

    public deleteNote(noteId: number | undefined): void {
        this.http.delete(`notes/${noteId}`)
            .then(response => this.getNotes())
            .catch(error => { })
    }

    private getNotes(): void {
        this.http.get<INote[]>(`notes/${this.projectId}`)
            .then(response => this._notes = response.reverse())
            .catch(error => { })
    }
}
