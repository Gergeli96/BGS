import { GaleryFileEntity } from "src/db/entities/galerie-files.entity"

export class GaleryFileDto {
    public id: number
    public fileid: string
    public galery_id: number

    constructor(entity: GaleryFileEntity) {
        if(entity) {
            this.id = entity.id
            this.fileid = entity.fileid
            this.galery_id = entity.galery_id
        }
    }
}
