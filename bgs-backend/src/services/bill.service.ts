import { BillEntity } from "src/db/entities/bill.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { BillDto } from "src/dto/bill.dto";
import { Repository } from "typeorm";

export class BillsService {

    constructor(
        @InjectRepository(BillEntity) private billsRepository: Repository<BillEntity>
    ) { }


    public async getBillsForProject(projectid: number): Promise<BillEntity[]> {
        return await this.billsRepository.find({ where: {project_id: projectid} })
    }
    
    public async createBill(model: BillDto): Promise<BillEntity> {
        return await this.billsRepository.save(this.projectDtoToEntiy(model, new BillEntity()))
    }

    public async deleteBill(id: number): Promise<any> {
        return await this.billsRepository.delete(id)
    }

    private projectDtoToEntiy(dto: BillDto, entity: BillEntity): BillEntity {
        entity.id = dto.id
        entity.from = dto.from
        entity.to = dto.to
        entity.amount = dto.amount
        entity.paid = typeof dto.paid == 'boolean' ? dto.paid : false
        entity.project_id = dto.project_id

        return entity
    }
}
