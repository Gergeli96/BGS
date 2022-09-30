import { WebshopElementGroupEntity } from "src/db/entities/webshop-element-group.entity";
import { WebshopElementGroupDto } from "src/dto/webshop-element-group.dto";
import { BaseEntityService } from "./base-entity.service";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

export class WebshopElementGroupService extends BaseEntityService<WebshopElementGroupEntity, WebshopElementGroupDto> {
    protected baseDto = new WebshopElementGroupDto()

    constructor(
        @InjectRepository(WebshopElementGroupEntity) protected repository: Repository<WebshopElementGroupEntity>
    ) {
        super(repository)
    }


    public async getDetailedEntities(): Promise<WebshopElementGroupDto[]> {
        let elements = await this.repository.find({relations: ['elements']})

        return elements.map(el => new WebshopElementGroupDto(el))
    }

    protected dtoToEntity(dto: WebshopElementGroupDto, entity: WebshopElementGroupEntity): WebshopElementGroupEntity {
        entity.id = dto.id
        entity.name = dto.name
        entity.price = dto.price
        entity.description = dto.description
        
        return entity
    }

    protected entityToDto(entity: WebshopElementGroupEntity): WebshopElementGroupDto {
        return new WebshopElementGroupDto(entity)
    }
}
