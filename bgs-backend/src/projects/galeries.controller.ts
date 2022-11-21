import { Body, Controller, Delete, Get, Param, Post, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { BadRequest } from 'src/exceptions/badrequest.exception';
import { IMulterFile } from 'src/interfaces/file.interfaces';
import { FilesInterceptor } from '@nestjs/platform-express';
import { GaleryService } from 'src/services/galery.service';
import { BitNumber } from 'src/helpers/number-helper';
import { GaleryDto } from 'src/dto/galery.dto';
import { AuthGuard } from '@nestjs/passport';
import { DeleteResult } from 'typeorm';

@Controller('api/galeries')
export class GaleriesController {

    constructor(
        private galeryService: GaleryService
    ) { }


    @Get('')
    public async getGaleries(): Promise<GaleryDto[]> {
        return await this.galeryService.getGaleries()
    }

    @Get('detailed/:id')
    public async getDetailedGalery(@Param('id') id: string): Promise<GaleryDto> {
        return await this.galeryService.getGalery(BitNumber.parseInt(id))
    }
    
    @Post('upload')
    @UseGuards(AuthGuard('jwt')) 
    @UseInterceptors(FilesInterceptor('files'))
    public async create(@UploadedFiles() files: Array<IMulterFile>, @Body() body: GaleryDto): Promise<GaleryDto> {
        if (files.length < 1) {
            throw new BadRequest()
        }

        return await this.galeryService.createGalery(body, files)
    }

    @Delete('delete/:id')
    @UseGuards(AuthGuard('jwt')) 
    public async deleteGalery(@Param('id') id: string): Promise<DeleteResult> {
        return await this.galeryService.deleteGalery(BitNumber.parseInt(id))
    }
}
