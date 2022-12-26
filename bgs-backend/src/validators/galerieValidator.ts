import { IMulterFile } from "src/interfaces/file.interfaces"
import { BitString } from "src/helpers/string-helper"
import { BaseValidator } from "./BaseValidator"
import { GaleryDto } from "src/dto/galery.dto"

export class GalerieValidator extends BaseValidator<GaleryDto> {

    constructor(model: GaleryDto, files: IMulterFile[]) {
        super(model)
        this.hasFiles(files)
        this.ruleFor('name', m => BitString.emptyOrWhiteSpace(m.name), 'Kötelező mező!')
    }
}
