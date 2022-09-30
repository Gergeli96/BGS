import { WebshopElementEntity } from "src/db/entities/webshop-element.entity";
import { WebshopFileEntity } from "src/db/entities/webshop-file.entity";
import { BadRequest } from "src/exceptions/badrequest.exception";
import { WebshopElementDto } from "src/dto/webshop-element.dto";
import { IMulterFile } from "src/interfaces/file.interfaces";
import { ProjectFilesService } from "./projectfiles.service";
import { WebshopFilesService } from "./webshop-file.service";
import { BaseEntityService } from "./base-entity.service";
import { WebshopFileDto } from "src/dto/webshop-file.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";

@Injectable()
export class WebshopElementService extends BaseEntityService<WebshopElementEntity, WebshopElementDto> {
    protected baseDto = new WebshopElementDto()

    constructor(
        @InjectRepository(WebshopElementEntity) protected repository: Repository<WebshopElementEntity>,
        private webshopFileService: WebshopFilesService,
        private filesService: ProjectFilesService
    ) {
        super(repository)
    }

    public async getDetailedElements(groupid?: number): Promise<WebshopElementDto[]> {
        let elements = await this.repository.find({where: {groupid: groupid}, relations: ['files']})

        if (groupid > 0) {
            elements.filter(el => el.groupid == groupid)
        }

        return elements.map(el => new WebshopElementDto(el))
    }
    
    public async saveEntiy(files: Array<IMulterFile>, model: WebshopElementDto): Promise<WebshopElementDto> {
        if (files.length < 1) {
            throw new BadRequest()
        }
        
        const fileIds = await this.filesService.uploadFiles(files)
        let element = await this.repository.save(this.dtoToEntity(model, new WebshopElementEntity()))

        const elementFiles = fileIds.map(fileId => {
            let file = new WebshopFileDto()
            file.webshopelementid = element.id
            file.fileid = fileId

            return file
        })
        this.webshopFileService.createEntities(elementFiles, new WebshopFileEntity())

        return this.entityToDto(element)
    }

    protected dtoToEntity(dto: WebshopElementDto, entity: WebshopElementEntity): WebshopElementEntity {
        entity.id = dto.id
        entity.name = dto.name
        entity.price = dto.price
        entity.groupid = dto.groupid
        entity.description = dto.description

        return entity
    }

    protected entityToDto(entity: WebshopElementEntity): WebshopElementDto {
        return new WebshopElementDto(entity)
    }
}
