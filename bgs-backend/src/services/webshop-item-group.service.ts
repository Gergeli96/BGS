import { WebshopItemGroupEntity } from "src/db/entities/webshop-item-group.entity";
import { WebshopItemEntity } from "src/db/entities/webshop-item.entity";
import { DeleteResult, In, Repository, UpdateResult } from "typeorm";
import { WebshopItemGroupDto } from "src/dto/webshop-item-group.dto";
import { BadRequest } from "src/exceptions/badrequest.exception";
import { WebshopFilesService } from "./webshop-file.service";
import { BaseEntityService } from "./base-entity.service";
import { InjectRepository } from "@nestjs/typeorm";

export class WebshopElementGroupService extends BaseEntityService<WebshopItemGroupEntity, WebshopItemGroupDto> {
    protected baseDto = new WebshopItemGroupDto()

    constructor(
        @InjectRepository(WebshopItemGroupEntity) protected repository: Repository<WebshopItemGroupEntity>,
        @InjectRepository(WebshopItemEntity) protected itemRepository: Repository<WebshopItemEntity>,
        private webshopFileService: WebshopFilesService
    ) {
        super(repository)
    }


    public async getDetailedEntities(): Promise<WebshopItemGroupDto[]> {
        let elements = await this.repository.find({relations: ['elements']})

        return elements.map(el => new WebshopItemGroupDto(el))
    }

    public async updateEntiy(model: WebshopItemGroupDto): Promise<UpdateResult> {
        const entity = await this.getEntity(model.id as number)

        if (entity != null) {
            if (model.edititems) {
                let items = await this.itemRepository.find({where: {groupid: entity.id}})
                
                items.forEach(async x => {
                    x.price = entity.price
                    x.name = entity.name
                    x.description = entity.description
                    
                    await this.itemRepository.update(x.id, x)
                })
            }

            return await this.repository.update(model.id as number, this.dtoToEntity(model, entity as any) as any)
        }
        else {
            throw new BadRequest()
        }
    }

    public async deleteEntity(id: number): Promise<DeleteResult> {
        const items = await this.itemRepository.find({where: {groupid: id}, relations: ['files']})
        let fileIds: number[] = [ ]
        items.forEach(x => x.files.forEach(file => fileIds.push(file.id)))

        await this.webshopFileService.deleteEntities(fileIds)

        return await this.repository.delete(id)
    }

    protected dtoToEntity(dto: WebshopItemGroupDto, entity: WebshopItemGroupEntity): WebshopItemGroupEntity {
        entity.id = dto.id
        entity.name = dto.name
        entity.price = dto.price
        entity.description = dto.description
        
        return entity
    }

    protected entityToDto(entity: WebshopItemGroupEntity): WebshopItemGroupDto {
        return new WebshopItemGroupDto(entity)
    }
}
