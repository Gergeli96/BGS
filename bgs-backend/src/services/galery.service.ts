import { GaleryEntity } from "src/db/entities/galerie.entity"
import { IMulterFile } from "src/interfaces/file.interfaces"
import { GaleryFileService } from "./galery-file.service"
import { InjectRepository } from "@nestjs/typeorm"
import { GaleryDto } from "src/dto/galery.dto"
import { Injectable } from "@nestjs/common"
import { Repository } from "typeorm"

@Injectable()
export class GaleryService {

    constructor(
        @InjectRepository(GaleryEntity) private galeriesRepository: Repository<GaleryEntity>,
        private galerieFileService: GaleryFileService
    ) { }


    public async getGalery(id: number): Promise<GaleryDto> {
        const galery = await this.galeriesRepository.findOne({where: {id: id}, relations: ['files']})

        return new GaleryDto(galery)
    }

    public async getGaleries(): Promise<GaleryDto[]> {
        const galeries = await this.galeriesRepository.find({relations: ['files']})

        return galeries.map(x => new GaleryDto(x))
    }
    
    public async createGalery(model: GaleryDto, files: IMulterFile[]): Promise<GaleryDto> {
        const galery = await this.galeriesRepository.save(this.galeryDtoToEntity(model, new GaleryEntity()))

        await this.galerieFileService.create(galery.id, files)

        return new GaleryDto(galery)
    }

    public async deleteGalery(id: number): Promise<any> {
        await this.galerieFileService.deleteFiles(id)

        return await this.galeriesRepository.delete(id)
    }

    private galeryDtoToEntity(dto: GaleryDto, entity: GaleryEntity): GaleryEntity {
        entity.id = dto.id
        entity.name = dto.name
        entity.description = dto.description

        return entity
    }
}
