import { WebshopElementGroupService } from 'src/services/webshop-item-group.service';
import { WebshopItemGroupEntity } from 'src/db/entities/webshop-item-group.entity';
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { WebshopItemGroupDto } from 'src/dto/webshop-item-group.dto';
import { DeleteResult, UpdateResult } from 'typeorm';

@Controller('api/webshopitemgroups')
export class WebshopElementGroupController {

    constructor(
        private readonly service: WebshopElementGroupService
    ) { }


    @Get('')
    public async getWebshopItemGroups(): Promise<WebshopItemGroupDto[]> {
        return await this.service.getAllEntity()
    }

    @Get('detailed')
    public async getDeatiledWebshopItemGroups(): Promise<WebshopItemGroupDto[]> {
        return await this.service.getDetailedEntities()
    }

    @Get('entity/:id')
    public async getWebshopItemGroup(@Param('id') id: number): Promise<WebshopItemGroupDto> {
        return await this.service.getEntity(id)
    }

    @Post('')
    public async createWebshopItemGroup(@Body() feg: WebshopItemGroupDto): Promise<WebshopItemGroupDto> {
        return await this.service.createEntiy(feg, new WebshopItemGroupEntity())
    }

    @Put('')
    public async editWebshopItemGroup(@Body() feg: WebshopItemGroupDto): Promise<UpdateResult> {
        return await this.service.updateEntiy(feg)
    }

    @Delete('delete/:id')
    public async deleteWebshopItemGroup(@Param('id') id?: string): Promise<DeleteResult> {
        return await this.service.deleteEntity(isNaN(parseInt(id)) ? null : parseInt(id))
    }
}
