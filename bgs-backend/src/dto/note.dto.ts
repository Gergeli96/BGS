import { NoteEntity } from "src/db/entities/note.entity"
import { ProjectDto } from "./project.dto"

export class NoteDto {
    public id?: number
    public content: string
    public project_id: number
    public project: ProjectDto

    constructor(entity: NoteEntity) {
        if (entity) {
            this.id = entity.id
            this.content = entity.content
            this.project_id = entity.project_id

            if (entity.project) {
                this.project = new ProjectDto(entity.project)
            }
        }
    }
}
