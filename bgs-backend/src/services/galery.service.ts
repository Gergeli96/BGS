import { GaleryEntity } from "src/db/entities/galerie.entity"
import { InjectRepository } from "@nestjs/typeorm"
import { GaleryDto } from "src/dto/galery.dto"
import { Injectable } from "@nestjs/common"
import { Repository } from "typeorm"

@Injectable()
export class GaleryService {

    constructor(
        @InjectRepository(GaleryEntity) private galeriesRepository: Repository<GaleryEntity>
    ) { }


    public async getGalery(id: number): Promise<GaleryEntity> {
        return await this.galeriesRepository.findOne({where: {id: id}, relations: ['files']})
    }

    public async getGaleries(): Promise<GaleryEntity[]> {
        return await this.galeriesRepository.find({relations: ['files']})
    }
    
    public async createGalery(model: GaleryDto): Promise<GaleryEntity> {
        return await this.galeriesRepository.save(this.galeryDtoToEntity(model, new GaleryEntity()))
    }

    public async deleteGalery(id: number): Promise<any> {
        return await this.galeriesRepository.delete(id)
    }

    private galeryDtoToEntity(dto: GaleryDto, entity: GaleryEntity): GaleryEntity {
        entity.id = dto.id
        entity.name = dto.name
        entity.description = dto.description

        return entity
    }
}
