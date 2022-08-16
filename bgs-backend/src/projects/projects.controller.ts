import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ProjectsService } from 'src/services/projects.service';
import { ProjectEntity } from 'src/db/entities/project.entity';
import { IOkResponse } from 'src/general-types/ok-response';
import { ProjectDto } from 'src/dto/project.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('api/projects')
@UseGuards(AuthGuard('jwt')) 
export class ProjectsController {

    constructor(
        private readonly projectsService: ProjectsService
    ) { }


    @Get()
    public async getProjects(): Promise<ProjectDto[]> {
        return await this.projectsService.getProjects()
    }

    @Get(':id')
    public async getProject(@Param('id') id: number): Promise<ProjectDto> {
        return new ProjectDto(await this.projectsService.getProject(id))
    }

    @Get('detailed/:id')
    public async getDetailedProject(@Param('id') id: number): Promise<ProjectEntity> {
        return await this.projectsService.getDetailedProject(id)
    }

    @Post('create')
    public async createProject(@Body() project: ProjectDto): Promise<ProjectDto> {
        return new ProjectDto(await this.projectsService.createProject(project))
    }

    @Put('update')
    public async updateProject(@Body() project: ProjectDto): Promise<IOkResponse> {
        return await this.projectsService.updateProject(project)
    }

    @Delete('delete/:id')
    public async deleteProject(@Param('id') id: number): Promise<any> {
        return await this.projectsService.deleteProject(id)
    }
}
