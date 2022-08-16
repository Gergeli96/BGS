import { GaleryFileEntity } from "src/db/entities/galerie-files.entity";
import { GaleryEntity } from "src/db/entities/galerie.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";

@Injectable()
export class GaleryFileService {

    constructor(
        @InjectRepository(GaleryFileEntity) private galerieFilesRepository: Repository<GaleryFileEntity>
    ) { }

    
    public async createGaleries(model: GaleryEntity, fileIds: string[]): Promise<GaleryFileEntity[]> {
        const galeryFiles = fileIds.map(fileId => {
            const galeryFile = new GaleryFileEntity()
            galeryFile.fileid = fileId
            galeryFile.galery_id = model.id

            return galeryFile
        })

        return await this.galerieFilesRepository.save(galeryFiles)
    }
}
