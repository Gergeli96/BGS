import { TypeOrmModule } from '@nestjs/typeorm';
import { DbModule } from 'src/db/db.module';
import { Module } from '@nestjs/common';

import { WebshopElementGroupController } from './webshop-element-group.controller';
import { FurnitureCategoryController } from './furniture-category.controller';
import { WebshopElementController } from './webshop-element.controller';
import { WebshopController } from './webshop.controller';

import { WebshopElementGroupEntity } from 'src/db/entities/webshop-element-group.entity';
import { WebshopElementEntity } from 'src/db/entities/webshop-element.entity';
import { FurnitureCategoryEntity } from 'src/db/entities/furniture-category';
import { WebshopFileEntity } from 'src/db/entities/webshop-file.entity';

import { WebshopElementGroupService } from 'src/services/webshop-element-group.service';
import { FurnitureCategoryService } from 'src/services/furniture-category.service';
import { WebshopElementService } from 'src/services/webshop-element.service';
import { WebshopFilesService } from 'src/services/webshop-file.service';
import { ProjectFilesService } from 'src/services/projectfiles.service';

@Module({
    imports: [
        DbModule,
        TypeOrmModule.forFeature([FurnitureCategoryEntity, WebshopElementGroupEntity, WebshopElementEntity, WebshopFileEntity])
    ],
    controllers: [
        WebshopElementGroupController,
        FurnitureCategoryController,
        WebshopElementController,
        WebshopController
    ],
    providers: [
        WebshopElementGroupService,
        FurnitureCategoryService,
        WebshopElementService,
        WebshopFilesService,
        ProjectFilesService
    ]
})
export class WebshopModule {}
