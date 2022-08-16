import { ProjectEntity } from "src/db/entities/project.entity"

export class ProjectDto {
    public id?: number
    public name: string
    public customer: string
    public customeradresse: string
    public customerphone: string
    public deadline: string

    constructor(entity: ProjectEntity) {
        if (entity) {
            this.id = entity.id
            this.name = entity.name
            this.customer = entity.customer
            this.customeradresse = entity.customeradresse
            this.customerphone = entity.customerphone
            this.deadline = entity.deadline
        }
    }
}
