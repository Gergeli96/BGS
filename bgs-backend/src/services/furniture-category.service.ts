import { FurnitureCategorymValidator } from "src/validators/furnitureCategoryValidator";
import { FurnitureCategoryEntity } from "src/db/entities/furniture-category";
import { FurnitureCategoryDto } from "src/dto/furniture-category.dto";
import { DeleteResult, Repository, UpdateResult } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Injectable } from "@nestjs/common";

@Injectable()
export class FurnitureCategoryService {

    constructor(
        @InjectRepository(FurnitureCategoryEntity) private fcRepository: Repository<FurnitureCategoryEntity>
    ) { }


    public async getFurnitureCategories(): Promise<FurnitureCategoryEntity[]> {
        return await this.fcRepository.find()
    }

    public async createFurnitureCategory(model: FurnitureCategoryDto): Promise<FurnitureCategoryDto> {
        new FurnitureCategorymValidator(model).validate()

        return new FurnitureCategoryDto(await this.fcRepository.save(this.dtoToEntity(model)))
    }

    public async updateEntiy(model: FurnitureCategoryDto): Promise<UpdateResult> {
        new FurnitureCategorymValidator(model).validate()

        return await this.fcRepository.update(model.id, this.dtoToEntity(model))
    }

    public async deleteCategory(id: number): Promise<DeleteResult> {
        return await this.fcRepository.delete(id)
    }

    private dtoToEntity(dto: FurnitureCategoryDto): FurnitureCategoryEntity {
        let entity = new FurnitureCategoryEntity()
        entity.id = dto.id
        entity.name = dto.name

        return entity
    }
}
