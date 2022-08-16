import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { NoteService } from 'src/services/note.service';
import { AuthGuard } from '@nestjs/passport';
import { NoteDto } from 'src/dto/note.dto';

@Controller('api/notes')
@UseGuards(AuthGuard('jwt')) 
export class NotesController {

    constructor(
        private noteService: NoteService
    ) { }


    @Get(':projectid')
    public async getprojectNotes(@Param('projectid') projectid: number): Promise<NoteDto[]> {
        let notes = await this.noteService.getNotesForProject(projectid)
        
        return notes.map(note =>new NoteDto(note))
    }

    @Post('create')
    public async createNote(@Body() note: NoteDto): Promise<NoteDto> {
        let entity = await this.noteService.createNote(note)
        
        return new NoteDto(entity)
    }

    @Delete(':noteid')
    public async deleteNote(@Param('noteid') noteid: number): Promise<any> {
        return await this.noteService.deleteNote(noteid)
    }
}
