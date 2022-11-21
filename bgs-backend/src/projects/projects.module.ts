import { TypeOrmModule } from '@nestjs/typeorm';
import { DbModule } from 'src/db/db.module';
import { Module } from '@nestjs/common';

import { ProjectfilesController } from './projectfiles.controller';
import { GaleriesController } from './galeries.controller';
import { ProjectsController } from './projects.controller';
import { BillsController } from './bills.controller';
import { NotesController } from './notes.controller';

import { GaleryFileService } from 'src/services/galery-file.service';
import { FileUploadService } from 'src/services/file-upload.service';
import { ProjectsService } from 'src/services/projects.service';
import { GaleryService } from 'src/services/galery.service';
import { BillsService } from 'src/services/bill.service';
import { NoteService } from 'src/services/note.service';

import { GaleryFileEntity } from 'src/db/entities/galerie-files.entity';
import { ProjectEntity } from 'src/db/entities/project.entity';
import { GaleryEntity } from 'src/db/entities/galerie.entity';
import { BillEntity } from 'src/db/entities/bill.entity';
import { NoteEntity } from 'src/db/entities/note.entity';

@Module({
    imports: [
        DbModule,
        TypeOrmModule.forFeature([ProjectEntity, BillEntity, NoteEntity, GaleryEntity, GaleryFileEntity])
    ],
    controllers: [
        ProjectfilesController,
        ProjectsController,
        GaleriesController,
        BillsController,
        NotesController
    ],
    providers: [
        GaleryFileService,
        FileUploadService,
        ProjectsService,
        GaleryService,
        BillsService,
        NoteService
    ]
})
export class ProjectsModule { }
