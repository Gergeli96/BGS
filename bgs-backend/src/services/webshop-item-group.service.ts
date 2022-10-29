import { WebshopItemGroupEntity } from "src/db/entities/webshop-item-group.entity";
import { WebshopItemEntity } from "src/db/entities/webshop-item.entity";
import { WebshopItemGroupDto } from "src/dto/webshop-item-group.dto";
import { BadRequest } from "src/exceptions/badrequest.exception";
import { BaseEntityService } from "./base-entity.service";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, UpdateResult } from "typeorm";

export class WebshopElementGroupService extends BaseEntityService<WebshopItemGroupEntity, WebshopItemGroupDto> {
    protected baseDto = new WebshopItemGroupDto()

    constructor(
        @InjectRepository(WebshopItemGroupEntity) protected repository: Repository<WebshopItemGroupEntity>,
        @InjectRepository(WebshopItemEntity) protected itemRepository: Repository<WebshopItemEntity>
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
