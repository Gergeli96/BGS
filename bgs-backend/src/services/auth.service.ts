import { IRegistrationStatus, IWhoAmI, JwtPayload } from "src/general-types/auth-types";
import { UnathorizedException } from "src/exceptions/unatorized.exception";
import { LoginDto, UserDto } from "src/dto/user.dto";
import { UserService } from "./user.service";
import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

interface ICreateTokenResult {
    expiresIn: number
    token: string
}

@Injectable()
export class AuthService {

    constructor(
        private userService: UserService,
        private jwtService: JwtService
    ) { }


    public async register(userDto: UserDto): Promise<IRegistrationStatus> {
        let status: IRegistrationStatus = {success: true}

        try {
            await this.userService.create(userDto)
        } catch (err) {
            status.success = false    
        }

        return status
    }

    public async login(loginUserDto: LoginDto): Promise<IWhoAmI> {
        const user = await this.userService.findByLogin(loginUserDto)
           
        const token: ICreateTokenResult = this._createToken(user)
        
        return {
            id: user.id,
            username: user.username,
            loggedin: true,
            token: token.token
        }
    }

    public async refreshToken(token: string): Promise<IWhoAmI> {
        if (token === null || token === undefined || token === '') {
            return {
                id: null,
                username: '',
                loggedin: false,
                token: ''
            }
        }

        const decodedToken = this.jwtService.decode(token)

        const user = await this.validateUser({username: decodedToken['username']})

        const newToken = this._createToken({username: user.username} as UserDto)

        return {
            id: user.id,
            username: user.username,
            loggedin: true,
            token: newToken.token
        }
    }

    public async validateUser(payload: JwtPayload): Promise<UserDto> {
        const user = await this.userService.getUserByUsername(payload.username)

        if (!user) {
            throw new UnathorizedException()  
        }

        return user
    }
    
    private _createToken({ username }: UserDto): ICreateTokenResult {
        const user: JwtPayload = { username }
        const accessToken = this.jwtService.sign(user)
          
        return {
            token: accessToken,
            expiresIn: 10
        }
    }
}
