import { SiteinfoNames } from './interfaces/siteinfo.interface';
import { SiteInfoEntity } from './db/entities/siteinfo.entity';
import { BitNumber } from './helpers/number-helper';
import { InjectRepository } from '@nestjs/typeorm';
import { Controller, Post } from '@nestjs/common';
import { Repository } from 'typeorm';

@Controller('api/app')
export class AppController {

    constructor(
        @InjectRepository(SiteInfoEntity) private repository: Repository<SiteInfoEntity>
    ) { }


    @Post('siteinfo')
    public async siteinfo(): Promise<boolean> {
        try {
            const visitor = await this.repository.findOne({where: {name: SiteinfoNames.VISITORS}})
            const newVisitorCount = BitNumber.parseInt(visitor.value) + 1
            
            if (typeof newVisitorCount === 'number' && newVisitorCount > 0)
                visitor.value = newVisitorCount.toString()
    
            await this.repository.update(visitor.id, visitor)
            
            return true
        } catch (error) {
            return false
        }
    }
}
