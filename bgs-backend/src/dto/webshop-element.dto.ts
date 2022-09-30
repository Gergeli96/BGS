import { WebshopElementEntity } from "src/db/entities/webshop-element.entity";
import { WebshopElementGroupDto } from "./webshop-element-group.dto";
import { WebshopFileDto } from "./webshop-file.dto";

export class WebshopElementDto {
    public id?: number = 0
    public name: string = ''
    public price: number = 0
    public groupid: number = 0
    public description: string = ''
    public files: WebshopFileDto[] = [ ]
    public elementgroup: WebshopElementGroupDto

    constructor(entity?: WebshopElementEntity) {
        if (entity) {
            this.id = entity.id
            this.name = entity.name
            this.price = entity.price
            this.groupid = entity.groupid
            this.description = entity.description
            if (Array.isArray(entity.files)) {
                this.files = entity.files.map(file => new WebshopFileDto(file))
            }
            else this.files = [ ]

            this.files = entity.files
            if (entity.elementgroup) {
                this.elementgroup = new WebshopElementGroupDto(entity.elementgroup)
            }
        }
    }
}
