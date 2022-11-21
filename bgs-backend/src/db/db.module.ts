import { WebshopItemGroupEntity } from './entities/webshop-item-group.entity';
import { FurnitureCategoryEntity } from './entities/furniture-category';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { WebshopItemEntity } from './entities/webshop-item.entity';
import { WebshopFileEntity } from './entities/webshop-file.entity';
import { GaleryFileEntity } from './entities/galerie-files.entity';
import { ProjectEntity } from './entities/project.entity';
import { GaleryEntity } from './entities/galerie.entity';
import { BillEntity } from './entities/bill.entity';
import { NoteEntity } from './entities/note.entity';
import { UserEntity } from './entities/user.entity';
import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';

const dbConnection = (): TypeOrmModuleOptions => {
    return {
        type: 'mysql',
        host: process.env.DBHOST,
        port: parseInt(process.env.DBPORT),
        username: process.env.DBUSERNAME,
        password: process.env.DBPASSWORD,
        database: process.env.DATABASE,
        entities: [ProjectEntity, BillEntity, NoteEntity, UserEntity, GaleryFileEntity,
            GaleryEntity, FurnitureCategoryEntity, WebshopItemGroupEntity, WebshopItemEntity,
            WebshopFileEntity],
        synchronize: true
    }
}

@Module({
    imports: [
        ConfigModule.forRoot({isGlobal: true}),
        TypeOrmModule.forRoot(dbConnection())
    ],
    exports: [
        TypeOrmModule.forRoot(dbConnection())
    ]
})
export class DbModule { }
