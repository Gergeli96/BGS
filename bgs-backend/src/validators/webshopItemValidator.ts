import { IMulterFile } from "src/interfaces/file.interfaces"
import { WebshopItemDto } from "src/dto/webshop-item.dto"
import { BitNumber } from "src/helpers/number-helper"
import { BitString } from "src/helpers/string-helper"
import { BaseValidator } from "./BaseValidator"

export class WebshopItemValidator extends BaseValidator<WebshopItemDto> {

    constructor(model: WebshopItemDto, files: IMulterFile[]) {
        super(model)
        this.hasFiles(files)
        this.ruleFor('name', m => BitString.emptyOrWhiteSpace(m.name), 'Kötelező mező!')
        this.ruleFor('description', m => BitString.emptyOrWhiteSpace(m.description), 'Kötelező mező!')
        this.ruleFor('price', m => BitNumber.empty(m.price), 'Kötelező mező!')
        this.ruleFor('groupid', m => BitNumber.empty(m.groupid), 'Kötelező mező!')
        this.ruleFor('categoryid', m => BitNumber.empty(m.categoryid), 'Kötelező mező!')
    }
}
