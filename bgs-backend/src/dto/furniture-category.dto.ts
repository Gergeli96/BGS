import { FurnitureCategoryEntity } from "src/db/entities/furniture-category"

export class FurnitureCategoryDto {
    public id: number
    public name: string

    constructor(entity: FurnitureCategoryEntity) {
        this.id = entity.id
        this.name = entity.name
    }
}
