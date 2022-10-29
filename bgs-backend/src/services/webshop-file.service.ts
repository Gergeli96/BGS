import { WebshopFileEntity } from "src/db/entities/webshop-file.entity";
import { IMulterFile } from "src/interfaces/file.interfaces";
import { BaseEntityService } from "./base-entity.service";
import { FileUploadService } from "./file-upload.service";
import { WebshopFileDto } from "src/dto/webshop-file.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, Repository } from "typeorm";
import { Injectable } from "@nestjs/common";

@Injectable()
export class WebshopFilesService extends BaseEntityService<WebshopFileEntity, WebshopFileDto> {

    constructor(
        @InjectRepository(WebshopFileEntity) protected repository: Repository<WebshopFileEntity>,
        private fileUploadService: FileUploadService
    ) {
        super(repository)
    }

    public async deleteEntity(id: number): Promise<DeleteResult> {
        const file = await this.findOne(id)
        await this.fileUploadService.deleteFile(file.fileid)

        return await this.repository.delete(id)
    }

    public async upload(itemid: number, files: Array<IMulterFile>): Promise<WebshopFileDto[]> {
        const fileIds = await this.fileUploadService.uploadFiles(files)

        const elementFiles = fileIds.map(fileId => {
            let file = new WebshopFileEntity()
            file.webshopelementid = itemid
            file.fileid = fileId

            return file
        })

        await this.repository.save(elementFiles)

        return elementFiles.map(x => this.entityToDto(x))
    }

    protected dtoToEntity(dto: WebshopFileDto, entity: WebshopFileEntity): WebshopFileEntity {
        entity.id = dto.id
        entity.fileid = dto.fileid
        entity.webshopelementid = dto.webshopelementid
        
        return entity
    }

    protected entityToDto(entity: WebshopFileEntity): WebshopFileDto {
        return {
            id: entity.id,
            fileid: entity.fileid,
            webshopelementid: entity.webshopelementid
        }
    }
}
