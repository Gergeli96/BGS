import { UnathorizedException } from 'src/exceptions/unatorized.exception';
import { JwtPayload } from 'src/general-types/auth-types';
import { AuthService } from 'src/services/auth.service';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable } from '@nestjs/common';
import { UserDto } from 'src/dto/user.dto';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

    constructor(
        private readonly authService: AuthService
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: 'secret',
        })
    }
    

    public async validate(payload: JwtPayload): Promise<UserDto> {
        const user = await this.authService.validateUser(payload)
        
        if (!user) {
            throw new UnathorizedException()    
        }

        return user
    }
}
