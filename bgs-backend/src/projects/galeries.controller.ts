import { Body, Controller, Delete, Get, Param, Post, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { ProjectFilesService } from 'src/services/projectfiles.service';
import { GaleryFileService } from 'src/services/galery-file.service';
import { BadRequest } from 'src/exceptions/badrequest.exception';
import { IMulterFile } from 'src/interfaces/file.interfaces';
import { FilesInterceptor } from '@nestjs/platform-express';
import { GaleryService } from 'src/services/galery.service';
import { GaleryDto } from 'src/dto/galery.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('api/galeries')
export class GaleriesController {

    constructor(
        private projectFilesService: ProjectFilesService,
        private galeryfileService: GaleryFileService,
        private galeryService: GaleryService
    ) { }


    @Get()
    public async getGaleries(): Promise<GaleryDto[]> {
        const galeries = await this.galeryService.getGaleries()

        return galeries.map(g => new GaleryDto(g))
    }
    
    @Post('upload')
    @UseGuards(AuthGuard('jwt')) 
    @UseInterceptors(FilesInterceptor('files'))
    public async upload(@UploadedFiles() files: Array<IMulterFile>, @Body() body: GaleryDto): Promise<GaleryDto> {
        if (files.length < 1) {
            throw new BadRequest()
        }

        const fileIds = await this.projectFilesService.uploadFiles(files)
        const galery = await this.galeryService.createGalery(body)
        const galeryFiles = await this.galeryfileService.createGaleries(galery, fileIds)
        galery.files = galeryFiles

        return new GaleryDto(galery)
    }

    @Delete('delete/:id')
    @UseGuards(AuthGuard('jwt')) 
    public async deleteGalery(@Param('id') id: number): Promise<any> {
        const galery = await this.galeryService.getGalery(id)

        this.projectFilesService.deleteFiles(galery.files.map(file => file.fileid))

        return await this.galeryService.deleteGalery(id)
    }
}
