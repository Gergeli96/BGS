import { WebshopItemDto, WebshopItemOverViewDto } from "src/dto/webshop-item.dto";
import { WebshopItemEntity } from "src/db/entities/webshop-item.entity";
import { BadRequest } from "src/exceptions/badrequest.exception";
import { IMulterFile } from "src/interfaces/file.interfaces";
import { WebshopFilesService } from "./webshop-file.service";
import { BaseEntityService } from "./base-entity.service";
import { DeleteResult, Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Injectable } from "@nestjs/common";
import { In } from 'typeorm';

@Injectable()
export class WebshopItemService extends BaseEntityService<WebshopItemEntity, WebshopItemDto> {
    protected baseDto = new WebshopItemDto()

    constructor(
        @InjectRepository(WebshopItemEntity) protected repository: Repository<WebshopItemEntity>,
        private webshopFileService: WebshopFilesService
    ) {
        super(repository)
    }

    public async getDetailedElement(id?: number): Promise<WebshopItemDto> {
        let element = await this.repository.findOne({where: {id: id}, relations: ['files']})

        return new WebshopItemDto(element)
    }

    public async getDetailedElements(groupid?: number): Promise<WebshopItemDto[]> {
        let elements = await this.repository.find({relations: ['files']})

        if (groupid > 0) {
            elements = elements.filter(el => el.groupid == groupid)
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

    public async getWebshopCartItems(itemIds: number[]): Promise<WebshopItemDto[]> {
        const items =  await this.repository.find({where: {id: In(itemIds)}, relations: ['files']})

        return items.map(x => new WebshopItemDto(x))
    }
    
    public async saveEntiy(files: Array<IMulterFile>, model: WebshopItemDto): Promise<WebshopItemDto> {
        if (files.length < 1) {
            throw new BadRequest()
        }
        
        let element = await this.repository.save(this.dtoToEntity(model, new WebshopItemEntity()))
        await this.webshopFileService.upload(element.id, files)

        return this.entityToDto(element)
    }

    public async deleteEntity(id: number): Promise<DeleteResult> {
        const items = await this.repository.find({where: {id: id}, relations: ['files']})
        let fileIds: number[] = [ ]
        items.forEach(x => x.files.forEach(file => fileIds.push(file.id)))

        await this.webshopFileService.deleteEntities(fileIds)

        return await this.repository.delete(id)
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
