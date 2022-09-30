import { WebshopElementGroupEntity } from "src/db/entities/webshop-element-group.entity"
import { WebshopElementDto } from "./webshop-element.dto"

export class WebshopElementGroupDto {
    public id?: number = null
    public name: string = ''
    public price: number = 0
    public description: string = ''
    public elements: WebshopElementDto[] = [ ]

    constructor(entity?: WebshopElementGroupEntity) {
        if (entity) {
            this.id = entity.id
            this.name = entity.name
            this.price = entity.price
            this.description = entity.description

            if (Array.isArray(entity.elements)) {
                this.elements = entity.elements.map(x => new WebshopElementDto(x))
            }
            else this.elements = [ ]
        }
    }
}
