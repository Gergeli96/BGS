import { WebshopItemGroupEntity } from 'src/db/entities/webshop-item-group.entity';
import { WebshopElementGroupService } from 'src/services/webshop-item-group.service';
import { WebshopItemGroupDto } from 'src/dto/webshop-item-group.dto';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';

@Controller('api/webshopitemgroups')
export class WebshopElementGroupController {

    constructor(
        private readonly service: WebshopElementGroupService
    ) { }


    @Get('')
    public async getWebshopElementGroups(): Promise<WebshopItemGroupDto[]> {
        return await this.service.getAllEntity()
    }

    @Get('detailed')
    public async getDeatiledWebshopElementGroups(): Promise<WebshopItemGroupDto[]> {
        return await this.service.getDetailedEntities()
    }

    @Get(':id')
    public async getWebshopElementGroup(@Param('id') id: number): Promise<WebshopItemGroupDto> {
        return await this.service.getEntity(id)
    }

    @Post('')
    public async createWebshopElementGroup(@Body() feg: WebshopItemGroupDto): Promise<WebshopItemGroupDto> {
        return await this.service.createEntiy(feg, new WebshopItemGroupEntity())
    }
}
