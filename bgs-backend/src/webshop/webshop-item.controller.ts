import { Body, Controller, Get, Param, Post, Query, UploadedFiles, UseInterceptors } from "@nestjs/common"
import { WebshopItemDto, WebshopItemOverViewDto } from "src/dto/webshop-item.dto"
import { WebshopItemService } from "src/services/webshop-item.service"
import { IMulterFile } from "src/interfaces/file.interfaces";
import { FilesInterceptor } from '@nestjs/platform-express';

@Controller('api/webshopitems')
export class WebshopItemController {

    constructor(
        private readonly service: WebshopItemService
    ) { }


    @Get('')
    public async getElements(): Promise<WebshopItemDto[]> {
        return await this.service.getAllEntity()
    }
    
    @Get('overview/:id')
    public async getOverView(@Param('id') id?: string): Promise<WebshopItemOverViewDto> {
        return await this.service.getOverView(isNaN(parseInt(id)) ? 0 : parseInt(id))
    }

    @Get(':categoryid')
    public async getElementsWithCategory(@Param('categoryid') categoryid: number): Promise<WebshopItemDto[]> {
        return await this.service.getElementsWithCategory()
    }

    @Get('/detailed')
    public async getDetailedElements(@Query('groupid') groupid?: string): Promise<WebshopItemDto[]> {
        return await this.service.getDetailedElements(isNaN(parseInt(groupid)) ? null : parseInt(groupid))
    }

    @Get('/detailed/:id')
    public async getDetailedElement(@Param('id') id?: string): Promise<WebshopItemDto> {
        return await this.service.getDetailedElement(isNaN(parseInt(id)) ? null : parseInt(id))
    }

    @Post('')
    @UseInterceptors(FilesInterceptor('files'))
    public async createWebshopElement(@UploadedFiles() files: Array<IMulterFile>, @Body() model: WebshopItemDto): Promise<WebshopItemDto> {
        return await this.service.saveEntiy(files, model);
    }
}
