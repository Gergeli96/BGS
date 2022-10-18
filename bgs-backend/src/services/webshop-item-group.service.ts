import { WebshopItemGroupEntity } from "src/db/entities/webshop-item-group.entity";
import { WebshopItemGroupDto } from "src/dto/webshop-item-group.dto";
import { BaseEntityService } from "./base-entity.service";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

export class WebshopElementGroupService extends BaseEntityService<WebshopItemGroupEntity, WebshopItemGroupDto> {
    protected baseDto = new WebshopItemGroupDto()

    constructor(
        @InjectRepository(WebshopItemGroupEntity) protected repository: Repository<WebshopItemGroupEntity>
    ) {
        super(repository)
    }


    public async getDetailedEntities(): Promise<WebshopItemGroupDto[]> {
        let elements = await this.repository.find({relations: ['elements']})

        return elements.map(el => new WebshopItemGroupDto(el))
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
