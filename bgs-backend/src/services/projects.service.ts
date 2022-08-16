import { ProjectEntity } from 'src/db/entities/project.entity';
import { IOkResponse } from 'src/general-types/ok-response';
import { InjectRepository } from '@nestjs/typeorm';
import { ProjectDto } from 'src/dto/project.dto';
import { BaseService } from './base.service';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

@Injectable()
export class ProjectsService extends BaseService {

    constructor(
        @InjectRepository(ProjectEntity) private projectsRepository: Repository<ProjectEntity>
    ) {
        super()
    }


    public async getProject(id: number): Promise<ProjectEntity> {
        return await this.projectsRepository.findOne({where: {id: id}})
    }

    public async getDetailedProject(id: number): Promise<ProjectEntity> {
        return await this.projectsRepository.findOne({where: {id: id}, relations: ['bills']})
    }

    public async getProjects(): Promise<ProjectDto[]> {
        return new Promise((resolve, reject) => {
            this.projectsRepository.find()
                .then(projects => resolve(projects.map(p => new ProjectDto(p))))
                .catch(error => reject(error))
        })
    }

    public async createProject(model: ProjectDto): Promise<ProjectEntity> {
        return await this.projectsRepository.save(this.projectDtoToEntiy(model, new ProjectEntity()))
    }

    public async updateProject(model: ProjectDto): Promise<IOkResponse> {
        const project = await this.getProject(model.id)

        await this.projectsRepository.update(model.id, this.projectDtoToEntiy(model, project))

        return this.ok()
    }

    public async deleteProject(id: number): Promise<any> {
        return await this.projectsRepository.delete(id)
    }

    private projectDtoToEntiy(dto: ProjectDto, entity: ProjectEntity): ProjectEntity {
        entity.id = dto.id
        entity.name = dto.name
        entity.customer = dto.customer
        entity.customeradresse = dto.customeradresse
        entity.customerphone = dto.customerphone
        entity.deadline = dto.deadline

        return entity
    }
}
