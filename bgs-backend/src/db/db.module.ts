import { WebshopItemGroupEntity } from './entities/webshop-item-group.entity';
import { WebshopItemEntity } from './entities/webshop-item.entity';
import { FurnitureCategoryEntity } from './entities/furniture-category';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { WebshopFileEntity } from './entities/webshop-file.entity';
import { GaleryFileEntity } from './entities/galerie-files.entity';
import { ConfigModule, registerAs } from '@nestjs/config';
import { ProjectEntity } from './entities/project.entity';
import { GaleryEntity } from './entities/galerie.entity';
import { EnvDbConfig } from 'src/helpers/env-dbconfig';
import { BillEntity } from './entities/bill.entity';
import { NoteEntity } from './entities/note.entity';
import { UserEntity } from './entities/user.entity';
import { Module } from '@nestjs/common';

export default registerAs('database', () => ({
    DATABASE: process.env.DATABASE
}));

const dbConnection = (): TypeOrmModuleOptions => {
    const envConfig = new EnvDbConfig()

    return {
        type: 'mysql',
        host: envConfig.host,
        port: envConfig.port,
        username: envConfig.username,
        password: envConfig.password,
        database: envConfig.database,
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
