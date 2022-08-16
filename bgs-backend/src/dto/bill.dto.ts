import { BillEntity } from "src/db/entities/bill.entity";
import { ProjectDto } from "./project.dto";

export class BillDto {
    public id?: number
    public from: string
    public to: string
    public amount: number
    public paid: boolean
    public project_id?: number
    public project: ProjectDto

    constructor(entity: BillEntity) {
        if (entity) {
            this.id = entity.id
            this.from = entity.from
            this.to = entity.to
            this.amount = entity.amount
            this.paid = entity.paid
            this.project_id = entity.project_id

            if (entity.project) {
                this.project = new ProjectDto(entity.project)
            }
        }
    }
}
