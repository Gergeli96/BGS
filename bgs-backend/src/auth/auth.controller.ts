import { Body, Controller, Get, Post, Put, UploadedFile, UseInterceptors } from '@nestjs/common';
import { IRegistrationStatus, IWhoAmI } from 'src/general-types/auth-types';
import { LoginDto, UserDto, UserRegisterDto } from 'src/dto/user.dto';
import { BadRequest } from 'src/exceptions/badrequest.exception';
import { IMulterFile } from 'src/interfaces/file.interfaces';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthService } from 'src/services/auth.service';
import { Headers } from '@nestjs/common';

@Controller('api/auth')
export class AuthController {

    constructor(
        private readonly authService: AuthService
    ) { }


    @Get('resfresh')
    public async refreshToken(@Headers('Authorization') authorization: string): Promise<IWhoAmI> {
        return this.authService.refreshToken(this.getToken(authorization))
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

    @Put('editself')
    @UseInterceptors(FileInterceptor('files'))
    public async editSelf(@Headers('Authorization') authorization: string, @Body()user: UserDto, @UploadedFile() avatar: IMulterFile): Promise<IWhoAmI> {
        return this.authService.editSelf(this.getToken(authorization), user, avatar)
    }

    private getToken(authorization: string): string {
        return (authorization ?? '').replace('Bearer', '').trim()
    }
}
