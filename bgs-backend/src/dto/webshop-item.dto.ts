import { WebshopItemEntity } from "src/db/entities/webshop-item.entity";
import { WebshopItemGroupDto } from "./webshop-item-group.dto";
import { WebshopFileDto } from "./webshop-file.dto";

export class WebshopItemDto {
    public id?: number = 0
    public name: string = ''
    public design?: string = null
    public price: number = 0
    public groupid: number = 0
    public description: string = ''
    public categoryid: number = 0
    public files: WebshopFileDto[] = [ ]
    public elementgroup: WebshopItemGroupDto
    public discount: number | null = 0
    public stock: number = 0

    constructor(entity?: WebshopItemEntity) {
        if (entity) {
            this.id = entity.id
            this.name = entity.name
            this.price = entity.price
            this.groupid = entity.groupid
            this.description = entity.description
            this.categoryid = entity.categoryid
            this.design = entity.design
            this.discount = entity.discount
            this.stock = entity.stock

            if (Array.isArray(entity.files)) {
                this.files = entity.files.map(file => new WebshopFileDto(file))
            }
            else this.files = [ ]

            if (entity.elementgroup) {
                this.elementgroup = new WebshopItemGroupDto(entity.elementgroup)
            }
        }
    }
}

export class WebshopItemOverViewDto {
    public connecting: WebshopItemDto[]
    public item: WebshopItemDto

    constructor(item: WebshopItemEntity, connecting: WebshopItemEntity[]) {
        this.item = new WebshopItemDto(item)
        this.connecting = connecting.map(x => new WebshopItemDto(x))
    }
}
