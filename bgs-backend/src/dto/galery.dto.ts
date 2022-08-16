import { GaleryEntity } from '../db/entities/galerie.entity';
import { GaleryFileDto } from './galerie-file.dto';

export class GaleryDto {
    public id?: number
    public name: string
    public description: string
    public files: GaleryFileDto[]

    constructor(entity: GaleryEntity) {
        if (entity) {
            this.id = entity.id
            this.name = entity.name
            this.description = entity.description
            
            if (entity.files?.length > 0) {
                this.files = entity.files.map(file => new GaleryFileDto(file))
            }
            else {
                this.files = [ ]
            }
        }
    }
}
