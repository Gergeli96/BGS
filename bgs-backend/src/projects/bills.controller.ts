import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { BillsService } from 'src/services/bill.service';
import { AuthGuard } from '@nestjs/passport';
import { BillDto } from 'src/dto/bill.dto';

@Controller('api/bills')
@UseGuards(AuthGuard('jwt')) 
export class BillsController {

    constructor(
        private readonly billsService: BillsService
    ) { }


    @Get(':projectid')
    public async getBillsForProject(@Param('projectid') projectid: number): Promise<BillDto[]> {
        let bills = await this.billsService.getBillsForProject(projectid)

        return bills.map(bill => new BillDto(bill))
    }

    @Post('create')
    public async createBill(@Body() bill: BillDto): Promise<any> {
        return await this.billsService.createBill(bill)
    }

    @Delete('delete/:id')
    public async deleteBill(@Param('id') id: number): Promise<any> {
        return await this.billsService.deleteBill(id)
    }
}
