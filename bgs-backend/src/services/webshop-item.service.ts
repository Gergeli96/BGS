import { WebshopItemDto, WebshopItemOverViewDto } from "src/dto/webshop-item.dto";
import { WebshopItemEntity } from "src/db/entities/webshop-item.entity";
import { WebshopFileEntity } from "src/db/entities/webshop-file.entity";
import { BadRequest } from "src/exceptions/badrequest.exception";
import { IMulterFile } from "src/interfaces/file.interfaces";
import { WebshopFilesService } from "./webshop-file.service";
import { FileUploadService } from "./file-upload.service";
import { BaseEntityService } from "./base-entity.service";
import { WebshopFileDto } from "src/dto/webshop-file.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";

@Injectable()
export class WebshopItemService extends BaseEntityService<WebshopItemEntity, WebshopItemDto> {
    protected baseDto = new WebshopItemDto()

    constructor(
        @InjectRepository(WebshopItemEntity) protected repository: Repository<WebshopItemEntity>,
        private webshopFileService: WebshopFilesService,
        private filesService: FileUploadService
    ) {
        super(repository)
    }

    public async getDetailedElement(id?: number): Promise<WebshopItemDto> {
        let element = await this.repository.findOne({where: {id: id}, relations: ['files']})

        return new WebshopItemDto(element)
    }

    public async getDetailedElements(groupid?: number): Promise<WebshopItemDto[]> {
        let elements = await this.repository.find({where: {groupid: groupid}, relations: ['files']})

        if (groupid > 0) {
            elements.filter(el => el.groupid == groupid)
        }

        return elements.map(el => new WebshopItemDto(el))
    }

    public async getElementsWithCategory(categoryid?: number): Promise<WebshopItemDto[]> {
        let elements: WebshopItemEntity[] = [ ]

        if (categoryid > 0) {
            elements = await this.repository.find({where: {categoryid: categoryid}, relations: ['files']})
        }
        else {
            elements = await this.repository.find({relations: ['files']})
        }

        return elements.map(el => new WebshopItemDto(el))
    }

    public async getOverView(id: number): Promise<WebshopItemOverViewDto> {
        const item =  await this.repository.findOne({where: {id: id}, relations: ['files']})
        let connecting = (await this.repository.find({where: {groupid: item.categoryid}, relations: ['files']}))
            .filter(x => x.id != id)

        return new WebshopItemOverViewDto(item, connecting)
    }
    
    public async saveEntiy(files: Array<IMulterFile>, model: WebshopItemDto): Promise<WebshopItemDto> {
        if (files.length < 1) {
            throw new BadRequest()
        }
        
        const fileIds = await this.filesService.uploadFiles(files)
        let element = await this.repository.save(this.dtoToEntity(model, new WebshopItemEntity()))

        const elementFiles = fileIds.map(fileId => {
            let file = new WebshopFileDto()
            file.webshopelementid = element.id
            file.fileid = fileId

            return file
        })

        await this.webshopFileService.createEntities(elementFiles, new WebshopFileEntity())

        return this.entityToDto(element)
    }

    protected dtoToEntity(dto: WebshopItemDto, entity: WebshopItemEntity): WebshopItemEntity {
        entity.id = dto.id
        entity.name = dto.name
        entity.price = dto.price
        entity.groupid = dto.groupid
        entity.description = dto.description
        entity.categoryid = dto.categoryid
        entity.design = dto.design

        return entity
    }

    protected entityToDto(entity: WebshopItemEntity): WebshopItemDto {
        return new WebshopItemDto(entity)
    }
}
