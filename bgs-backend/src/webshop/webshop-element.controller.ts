import { Body, Controller, Get, Post, Query, UploadedFiles, UseInterceptors } from "@nestjs/common"
import { WebshopElementService } from "src/services/webshop-element.service"
import { WebshopElementDto } from "src/dto/webshop-element.dto"
import { IMulterFile } from "src/interfaces/file.interfaces";
import { FilesInterceptor } from '@nestjs/platform-express';

@Controller('api/webshopelements')
export class WebshopElementController {

    constructor(
        private readonly service: WebshopElementService
    ) { }


    @Get('/detailed')
    public async getDetailedElements(@Query('groupid') groupid?: string): Promise<WebshopElementDto[]> {
        return await this.service.getDetailedElements(isNaN(parseInt(groupid)) ? null : parseInt(groupid))
    }

    @Post('')
    @UseInterceptors(FilesInterceptor('files'))
    public async createWebshopElement(@UploadedFiles() files: Array<IMulterFile>, @Body() model: WebshopElementDto): Promise<WebshopElementDto> {
        return await this.service.saveEntiy(files, model);
    }

    // @Get('')
    // public async getFurnitureElementGroups(): Promise<WebshopElementGroupDto[]> {
    //     return await this.service.getAllEntity()
    // }

    // @Get(':id')
    // public async getFurnitureElementGroup(@Param('id') id: number): Promise<WebshopElementGroupDto> {
    //     return await this.service.getEntity(id)
    // }

    // @Post('')
    // public async createFurnitureElementGroup(@Body() feg: WebshopElementGroupDto): Promise<WebshopElementGroupDto> {
    //     return await this.service.createEntiy(feg, new WebshopElementGroupEntity())
    // }
}