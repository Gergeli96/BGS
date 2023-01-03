import { ProjectsModule } from './projects/projects.module';
import { MiddlewareConsumer, Module } from '@nestjs/common';
import { WebshopModule } from './webshop/webshop.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { DbModule } from './db/db.module';

import { ClientController } from './client/client.controller';
import { AppController } from './app.controller';

import { ClientMiddleware } from './middlewares/client.middleware';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

import { SiteInfoEntity } from './db/entities/siteinfo.entity';

@Module({
    imports: [
        ProjectsModule,
        WebshopModule,
        DbModule,
        ServeStaticModule.forRoot({
            rootPath: join(__dirname, '..', 'dist/frontend')
        }),
        AuthModule,
        TypeOrmModule.forFeature([SiteInfoEntity])
    ],
    controllers: [AppController],
    providers: []
})
export class AppModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
          .apply(ClientMiddleware)
          .forRoutes(ClientController)
      }
}
