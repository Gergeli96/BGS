import { WebshopFileEntity } from "src/db/entities/webshop-file.entity";
import { BaseEntityService } from "./base-entity.service";
import { WebshopFileDto } from "src/dto/webshop-file.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";

@Injectable()
export class WebshopFilesService extends BaseEntityService<WebshopFileEntity, WebshopFileDto> {

    constructor(
        @InjectRepository(WebshopFileEntity) protected repository: Repository<WebshopFileEntity>
    ) {
        super(repository)
    }

    protected dtoToEntity(dto: WebshopFileDto, entity: WebshopFileEntity): WebshopFileEntity {
        entity.id = dto.id
        entity.fileid = dto.fileid
        entity.webshopelementid = dto.webshopelementid
        
        return entity
    }
}
