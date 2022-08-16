import { ClientService } from 'src/services/client.service';
import { Controller, Get } from '@nestjs/common';

@Controller('client')
export class ClientController {

    constructor(
        private readonly clientService: ClientService
    ) { }


    @Get('*')
    public getFrontend(): any {
        return this.clientService.getApp()
    }

}
