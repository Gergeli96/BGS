import { WebshopItemService } from 'src/services/webshop-item.service';
import { WebshopItemDto } from 'src/dto/webshop-item.dto';
import { Body, Controller, Post } from '@nestjs/common';

@Controller('api/webshop')
export class WebshopController {

    constructor(
        private readonly service: WebshopItemService
    ) { }

    @Post('cartItems')
    public async getWebshopCartItems(@Body() model: {items: number[]}): Promise<WebshopItemDto[]> {
        return await this.service.getWebshopCartItems(model.items ?? [])
    }
}
