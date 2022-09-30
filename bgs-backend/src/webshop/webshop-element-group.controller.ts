import { WebshopElementGroupEntity } from 'src/db/entities/webshop-element-group.entity';
import { WebshopElementGroupService } from 'src/services/webshop-element-group.service';
import { WebshopElementGroupDto } from 'src/dto/webshop-element-group.dto';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';

@Controller('api/webshopelementgroups')
export class WebshopElementGroupController {

    constructor(
        private readonly service: WebshopElementGroupService
    ) { }


    @Get('')
    public async getWebshopElementGroups(): Promise<WebshopElementGroupDto[]> {
        return await this.service.getAllEntity()
    }

    @Get('detailed')
    public async getDeatiledWebshopElementGroups(): Promise<WebshopElementGroupDto[]> {
        return await this.service.getDetailedEntities()
    }

    @Get(':id')
    public async getWebshopElementGroup(@Param('id') id: number): Promise<WebshopElementGroupDto> {
        return await this.service.getEntity(id)
    }

    @Post('')
    public async createWebshopElementGroup(@Body() feg: WebshopElementGroupDto): Promise<WebshopElementGroupDto> {
        return await this.service.createEntiy(feg, new WebshopElementGroupEntity())
    }
}
