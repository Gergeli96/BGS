import { GaleryFileEntity } from "src/db/entities/galerie-files.entity";
import { IMulterFile } from "src/interfaces/file.interfaces";
import { FileUploadService } from "./file-upload.service";
import { DeleteResult, Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Injectable } from "@nestjs/common";

@Injectable()
export class GaleryFileService {

    constructor(
        @InjectRepository(GaleryFileEntity) private galerieFilesRepository: Repository<GaleryFileEntity>,
        private fileUploadService: FileUploadService
    ) { }


    public async create(galerieid: number, files: IMulterFile[]): Promise<void> {
        const fileIds = await this.fileUploadService.uploadFiles(files)

        const galerieFiles: GaleryFileEntity[] = fileIds.map(x => {
            return {
                fileid: x,
                galery_id: galerieid
            } as GaleryFileEntity
        })

        await this.galerieFilesRepository.save(galerieFiles)
    }

    public async deleteFiles(galerieId: number): Promise<DeleteResult> {
        const files = await this.galerieFilesRepository.find({where: {galery_id: galerieId}})

        files.forEach(async x => await this.fileUploadService.deleteFile(x.fileid))
        
        return this.galerieFilesRepository.delete(files.map(x => x.id))
    }
}
