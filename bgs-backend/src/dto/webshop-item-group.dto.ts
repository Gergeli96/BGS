import { WebshopItemGroupEntity } from "src/db/entities/webshop-item-group.entity"
import { WebshopItemDto } from "./webshop-item.dto"

export class WebshopItemGroupDto {
    public id?: number = null
    public name: string = ''
    public price: number = 0
    public description: string = ''
    public elements: WebshopItemDto[] = [ ]
    public edititems: boolean = false

    constructor(entity?: WebshopItemGroupEntity) {
        if (entity) {
            this.id = entity.id
            this.name = entity.name
            this.price = entity.price
            this.description = entity.description

            if (Array.isArray(entity.elements)) {
                this.elements = entity.elements.map(x => new WebshopItemDto(x))
            }
            else this.elements = [ ]
        }
    }
}
