import { WebshopFileEntity } from '../db/entities/webshop-file.entity'

export class WebshopFileDto {
    public id: number = 0
    public fileid: string = ''
    public webshopelementid: number = 0

    constructor(entity?: WebshopFileEntity) {
        if (entity) {
            this.id = entity.id
            this.fileid = entity.fileid
            this.webshopelementid = entity.webshopelementid
        }
    }
}

export interface IWebshopitemFileUpload {
    itemid: number
}
