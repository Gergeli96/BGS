import { DeleteResult, Repository, UpdateResult } from "typeorm";
import { BadRequest } from '../exceptions/badrequest.exception';

export interface IDto {
    id?: number
}

export abstract class BaseEntityService<Entity, Dto extends IDto> {
    protected baseDto: Dto

    constructor(protected repository: Repository<Entity>) { }

    
    public async getEntity(id: number): Promise<Dto | null> {
        let result = await this.findOne(id)

        return result == null ? null : this.entityToDto(result) 
    }

    public async getAllEntity(): Promise<Dto[]> {
        let result = await this.repository.find()

        return result.map(x => this.entityToDto(x))
    }
    
    public async createEntiy(model: Dto, entity: Entity): Promise<Dto> {
        let result = await this.repository.save(this.dtoToEntity(model, entity))

        return this.entityToDto(result)
    }
    
    public async createEntities(models: Dto[], entity: Entity): Promise<Dto[]> {
        let result = await this.repository.save(models.map(model => this.dtoToEntity(model, {...entity})))

        return result.map(x => this.entityToDto(x))
    }

    public async updateEntiy(model: Dto): Promise<UpdateResult> {
        const entity = await this.getEntity(model.id as number)

        if (entity != null) {
            return await this.repository.update(model.id as number, this.dtoToEntity(model, entity as any) as any)
        }
        else {
            throw new BadRequest()
        }
    }

    public async deleteEntity(id: number): Promise<DeleteResult> {
        return await this.repository.delete(id)
    }

    protected dtoToEntity(dto: Dto, entity: Entity): Entity {
        return entity
    }

    protected entityToDto(entity: Entity): Dto {
        return {...this.baseDto}
    }

    protected async findOne(id: number): Promise<Entity> {
        return await (this.repository as Repository<any>).findOne({ where: { id: id } })
    }
}
