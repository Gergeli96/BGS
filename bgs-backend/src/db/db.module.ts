import { WebshopItemGroupEntity } from './entities/webshop-item-group.entity';
import { FurnitureCategoryEntity } from './entities/furniture-category';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { WebshopItemEntity } from './entities/webshop-item.entity';
import { WebshopFileEntity } from './entities/webshop-file.entity';
import { GaleryFileEntity } from './entities/galerie-files.entity';
import { SiteinfoNames } from 'src/interfaces/siteinfo.interface';
import { SiteInfoEntity } from './entities/siteinfo.entity';
import { ProjectEntity } from './entities/project.entity';
import { GaleryEntity } from './entities/galerie.entity';
import { BillEntity } from './entities/bill.entity';
import { NoteEntity } from './entities/note.entity';
import { UserEntity } from './entities/user.entity';
import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { DataSource } from 'typeorm';

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
            WebshopFileEntity, SiteInfoEntity],
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
export class DbModule {
    private readonly initQuery = `INSERT INTO siteinfo (\`name\`, \`value\`) SELECT '${SiteinfoNames.VISITORS}', '0' FROM DUAL WHERE NOT EXISTS (SELECT * FROM siteinfo WHERE name='${SiteinfoNames.VISITORS}' LIMIT 1);`

    constructor(private dataSource: DataSource) {
        this.runQuery(`SELECT * FROM siteinfo WHERE \`name\` = '${SiteinfoNames.VISITORS}'`)
            .then(data => {
                if (Array.isArray(data) && data.length <= 0) {
                    this.runQuery(this.initQuery)
                }
            })
            .catch(error => console.log(error))
    }


    private runQuery(query: string): Promise<any> {
        return new Promise((resolve, reject) => {
            this.dataSource
                .createQueryRunner()
                .query(query)
                    .then(data => resolve(data))
                    .catch(error => reject(error))
        })
    }
}
