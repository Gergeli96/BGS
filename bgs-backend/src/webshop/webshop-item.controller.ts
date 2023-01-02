import { Body, Controller, Delete, Get, Param, Post, Query, UploadedFiles, UseGuards, UseInterceptors } from "@nestjs/common";
import { WebshopItemDto, WebshopItemOverViewDto } from "src/dto/webshop-item.dto";
import { WebshopItemService } from "src/services/webshop-item.service";
import { IMulterFile } from "src/interfaces/file.interfaces";
import { FilesInterceptor } from '@nestjs/platform-express';
import { BitNumber } from "src/helpers/number-helper";
import { AuthGuard } from "@nestjs/passport";
import { DeleteResult } from "typeorm";

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
        return await this.service.getOverView(BitNumber.parseInt(id))
    }

    @Get('/detailedlist')
    public async getDetailedElements(@Query('categoryid') categoryid?: string): Promise<WebshopItemDto[]> {
        return await this.service.getDetailedElements(BitNumber.parseInt(categoryid))
    }

    @Get('/detailed/:id')
    public async getDetailedElement(@Param('id') id?: string): Promise<WebshopItemDto> {
        return await this.service.getDetailedElement(BitNumber.parseInt(id))
    }

    @Post('')
    @UseGuards(AuthGuard('jwt')) 
    @UseInterceptors(FilesInterceptor('files'))
    public async createWebshopElement(@UploadedFiles() files: Array<IMulterFile>, @Body() model: WebshopItemDto): Promise<WebshopItemDto> {
        return await this.service.saveEntiy(files, model);
    }

    @Delete('delete/:id')
    @UseGuards(AuthGuard('jwt')) 
    public async deleteWebschopItem(@Param('id') id?: string): Promise<DeleteResult> {
        return await this.service.deleteEntity(BitNumber.parseInt(id))
    }
}
