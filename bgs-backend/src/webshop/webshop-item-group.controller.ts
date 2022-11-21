import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { WebshopElementGroupService } from 'src/services/webshop-item-group.service';
import { WebshopItemGroupEntity } from 'src/db/entities/webshop-item-group.entity';
import { WebshopItemGroupDto } from 'src/dto/webshop-item-group.dto';
import { BitNumber } from 'src/helpers/number-helper';
import { DeleteResult, UpdateResult } from 'typeorm';
import { AuthGuard } from '@nestjs/passport';

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
    @UseGuards(AuthGuard('jwt')) 
    public async createWebshopItemGroup(@Body() feg: WebshopItemGroupDto): Promise<WebshopItemGroupDto> {
        return await this.service.createEntiy(feg, new WebshopItemGroupEntity())
    }

    @Put('')
    @UseGuards(AuthGuard('jwt')) 
    public async editWebshopItemGroup(@Body() feg: WebshopItemGroupDto): Promise<UpdateResult> {
        return await this.service.updateEntiy(feg)
    }

    @Delete('delete/:id')
    @UseGuards(AuthGuard('jwt')) 
    public async deleteWebshopItemGroup(@Param('id') id?: string): Promise<DeleteResult> {
        return await this.service.deleteEntity(BitNumber.parseInt(id))
    }
}
