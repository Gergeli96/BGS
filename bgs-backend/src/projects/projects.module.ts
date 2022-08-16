import { Module } from '@nestjs/common';
import { ProjectsController } from './projects.controller';
import { ProjectsService } from 'src/services/projects.service';
import { DbModule } from 'src/db/db.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectEntity } from 'src/db/entities/project.entity';
import { BillsController } from './bills.controller';
import { BillsService } from 'src/services/bill.service';
import { BillEntity } from 'src/db/entities/bill.entity';
import { NotesController } from './notes.controller';
import { NoteEntity } from 'src/db/entities/note.entity';
import { NoteService } from 'src/services/note.service';
import { ProjectfilesController } from './projectfiles.controller';
import { ProjectFilesService } from 'src/services/projectfiles.service';
import { GaleryService } from 'src/services/galery.service';
import { GaleryFileService } from 'src/services/galery-file.service';
import { GaleryEntity } from 'src/db/entities/galerie.entity';
import { GaleryFileEntity } from 'src/db/entities/galerie-files.entity';
import { GaleriesController } from './galeries.controller';


@Module({
    imports: [
        DbModule,
        TypeOrmModule.forFeature([ProjectEntity, BillEntity, NoteEntity, GaleryEntity, GaleryFileEntity])
    ],
    controllers: [
        ProjectfilesController,
        ProjectsController,
        BillsController,
        NotesController,
        GaleriesController
    ],
    providers: [
        ProjectFilesService,
        GaleryFileService,
        ProjectsService,
        GaleryService,
        BillsService,
        NoteService
    ]
})
export class ProjectsModule { }
