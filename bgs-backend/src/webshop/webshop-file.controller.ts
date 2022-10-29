import { Body, Controller, Delete, Param, Post, UploadedFiles, UseInterceptors } from "@nestjs/common";
import { IWebshopitemFileUpload, WebshopFileDto } from "src/dto/webshop-file.dto";
import { WebshopFilesService } from "src/services/webshop-file.service";
import { IMulterFile } from "src/interfaces/file.interfaces";
import { FilesInterceptor } from "@nestjs/platform-express";
import { DeleteResult } from "typeorm";

@Controller('api/webshopfiles')
export class WebshopFilesController {

    constructor(
        private readonly service: WebshopFilesService
    ) { }


    @Post('')
    @UseInterceptors(FilesInterceptor('files'))
    public async upload(@UploadedFiles() files: Array<IMulterFile>, @Body() model: IWebshopitemFileUpload): Promise<WebshopFileDto[]> {
        return this.service.upload(model.itemid, files)
    }

    @Delete('delete/:id')
    public async deleteWebshopImage(@Param('id') id?: string): Promise<DeleteResult> {
        return await this.service.deleteEntity(isNaN(parseInt(id)) ? null : parseInt(id))
    }
}
