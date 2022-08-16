import { NoteEntity } from 'src/db/entities/note.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { NoteDto } from 'src/dto/note.dto';
import { Repository } from 'typeorm';

@Injectable()
export class NoteService {

    constructor(
        @InjectRepository(NoteEntity) private notesRepository: Repository<NoteEntity>
    ) { }


    public async getNotesForProject(projectId: number): Promise<NoteEntity[]> {
        return await this.notesRepository.find({ where: {project_id: projectId} })
    }
    
    public async createNote(model: NoteDto): Promise<NoteEntity> {
        return await this.notesRepository.save(this.noteDtoToEntity(model, new NoteEntity()))
    }

    public async deleteNote(id: number): Promise<any> {
        return await this.notesRepository.delete(id)
    }

    private noteDtoToEntity(dto: NoteDto, entity: NoteEntity): NoteEntity {
        entity.id = dto.id
        entity.content = dto.content
        entity.project_id = dto.project_id

        return entity
    }
}
