import { FurnitureCategoryEntity } from "src/db/entities/furniture-category";
import { InjectRepository } from "@nestjs/typeorm";
import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";

@Injectable()
export class FurnitureCategoryService {

    constructor(
        @InjectRepository(FurnitureCategoryEntity) private fcRepository: Repository<FurnitureCategoryEntity>
    ) { }


    public async getFurnitureCategories(): Promise<FurnitureCategoryEntity[]> {
        return await this.fcRepository.find()
    }
}
