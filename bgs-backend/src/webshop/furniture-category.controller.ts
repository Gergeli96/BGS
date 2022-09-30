import { FurnitureCategoryService } from 'src/services/furniture-category.service';
import { FurnitureCategoryDto } from 'src/dto/furniture-category.dto';
import { Controller, Get } from '@nestjs/common';

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
}
