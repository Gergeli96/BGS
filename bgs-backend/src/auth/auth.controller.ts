import { IRegistrationStatus, IWhoAmI } from 'src/general-types/auth-types';
import { BadRequest } from 'src/exceptions/badrequest.exception';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { LoginDto, UserRegisterDto } from 'src/dto/user.dto';
import { AuthService } from 'src/services/auth.service';
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
    public async register(@Body() userRegisterDto: UserRegisterDto): Promise<IRegistrationStatus> {    
        const result: IRegistrationStatus = await this.authService.register(userRegisterDto)

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
