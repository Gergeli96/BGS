import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { FurnitureCategoryService } from 'src/services/furniture-category.service';
import { FurnitureCategoryDto } from 'src/dto/furniture-category.dto';
import { BitNumber } from 'src/helpers/number-helper';
import { DeleteResult, UpdateResult } from 'typeorm';
import { AuthGuard } from '@nestjs/passport';

@Controller('api/furniturecategories')
export class FurnitureCategoryController {

    constructor(
        private readonly fcService: FurnitureCategoryService
    ) { }


    @Get('')
    public async getFurnitureCategories(): Promise<FurnitureCategoryDto[]> {
        const furnitureCategories = await this.fcService.getFurnitureCategories();

        return furnitureCategories.map(fc => new FurnitureCategoryDto(fc))
    }

    @Post('create')
    @UseGuards(AuthGuard('jwt')) 
    public async createFurnitureCategory(@Body() model: FurnitureCategoryDto): Promise<FurnitureCategoryDto> {
        return await this.fcService.createFurnitureCategory(model)
    }

    @Delete('delete/:id')
    @UseGuards(AuthGuard('jwt')) 
    public async deleteCategory(@Param('id') id: number): Promise<DeleteResult> {
        return await this.fcService.deleteCategory(BitNumber.parseInt(id))
    }

    @Put('edit')
    @UseGuards(AuthGuard('jwt')) 
    public async editFurnitureCategory(@Body() feg: FurnitureCategoryDto): Promise<UpdateResult> {
        return await this.fcService.updateEntiy(feg)
    }
}
