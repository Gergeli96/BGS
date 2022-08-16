import { IRegistrationStatus, IWhoAmI } from 'src/general-types/auth-types';
import { BadRequest } from 'src/exceptions/badrequest.exception';
import { Body, Controller, Get, Header, Post } from '@nestjs/common';
import { AuthService } from 'src/services/auth.service';
import { LoginDto, UserDto } from 'src/dto/user.dto';
import { User } from 'src/decorators/user.decorator';
import { Headers } from '@nestjs/common';

@Controller('api/auth')
export class AuthController {

    constructor(
        private readonly authService: AuthService
    ) { }


    @Get('resfresh')
    public async refreshToken(@Headers('Authorization') authorization: string): Promise<IWhoAmI> {
        return this.authService.refreshToken((authorization ?? '').replace('Bearer', '').trim())
    }

    @Post('register')  
    public async register(@Body() createUserDto: UserDto): Promise<IRegistrationStatus> {    
        const result: IRegistrationStatus = await this.authService.register(createUserDto)

        if (!result.success) {
            throw new BadRequest()
        }

        return result
    }

    @Post('login')  
    public async login(@Body() loginUserDto: LoginDto): Promise<IWhoAmI> {
        return await this.authService.login(loginUserDto)
    }
}
