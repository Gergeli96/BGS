import { FurnitureCategoryDto } from "src/dto/furniture-category.dto"
import { BitString } from "src/helpers/string-helper"
import { BaseValidator } from "./BaseValidator"

export class FurnitureCategorymValidator extends BaseValidator<FurnitureCategoryDto> {

    constructor(model: FurnitureCategoryDto) {
        super(model)
        this.ruleFor('name', m => BitString.emptyOrWhiteSpace(m.name), 'Kötelező mező!')
    }
}