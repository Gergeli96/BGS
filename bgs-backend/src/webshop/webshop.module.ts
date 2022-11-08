import { TypeOrmModule } from '@nestjs/typeorm';
import { DbModule } from 'src/db/db.module';
import { Module } from '@nestjs/common';

import { WebshopElementGroupController } from './webshop-item-group.controller';
import { FurnitureCategoryController } from './furniture-category.controller';
import { WebshopFilesController } from './webshop-file.controller';
import { WebshopItemController } from './webshop-item.controller';
import { WebshopController } from './webshop.controller';

import { WebshopItemGroupEntity } from 'src/db/entities/webshop-item-group.entity';
import { FurnitureCategoryEntity } from 'src/db/entities/furniture-category';
import { WebshopItemEntity } from 'src/db/entities/webshop-item.entity';
import { WebshopFileEntity } from 'src/db/entities/webshop-file.entity';

import { WebshopElementGroupService } from 'src/services/webshop-item-group.service';
import { FurnitureCategoryService } from 'src/services/furniture-category.service';
import { WebshopFilesService } from 'src/services/webshop-file.service';
import { WebshopItemService } from 'src/services/webshop-item.service';
import { FileUploadService } from 'src/services/file-upload.service';

@Module({
    imports: [
        DbModule,
        TypeOrmModule.forFeature([FurnitureCategoryEntity, WebshopItemGroupEntity, WebshopItemEntity, WebshopFileEntity])
    ],
    controllers: [
        WebshopElementGroupController,
        FurnitureCategoryController,
        WebshopFilesController,
        WebshopItemController,
        WebshopController
    ],
    providers: [
        WebshopElementGroupService,
        FurnitureCategoryService,
        WebshopFilesService,
        WebshopItemService,
        FileUploadService
    ]
})
export class WebshopModule {}
