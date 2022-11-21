import { IRegistrationStatus, IWhoAmI, JwtPayload } from "src/general-types/auth-types";
import { RegistrationValidator } from "src/validators/registrationValidator";
import { UnathorizedException } from "src/exceptions/unatorized.exception";
import { LoginDto, UserDto, UserRegisterDto } from "src/dto/user.dto";
import { IMulterFile } from "src/interfaces/file.interfaces";
import { UserEntity } from "src/db/entities/user.entity";
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


    public async register(userRegisterDto: UserRegisterDto): Promise<IRegistrationStatus> {
        let status: IRegistrationStatus = {success: true}

        new RegistrationValidator(userRegisterDto).validate()

        try {
           await  this.userService.create(userRegisterDto, null)
        } catch (err) {
            status.success = false    
        }

        return status
    }

    public async login(loginUserDto: LoginDto): Promise<IWhoAmI> {
        const user = await this.userService.findByLogin(loginUserDto)
           
        const token: ICreateTokenResult = this._createToken(user)

        return this.getWhoAmIFromUser(user, token.token)
    }

    public async refreshToken(token: string): Promise<IWhoAmI> {
        if (token === null || token === undefined || token === '') {
            return {
                id: null,
                username: '',
                loggedin: false,
                token: '',
                avatar: '',
                email: ''
            }
        }

        const decodedToken = this.jwtService.decode(token)

        const user = await this.validateUser({username: decodedToken['username']})

        const newToken = this._createToken({username: user.username} as UserDto)

        return this.getWhoAmIFromUser(user, newToken.token)
    }

    public async validateUser(payload: JwtPayload): Promise<UserDto> {
        const user = await this.userService.getUserByUsername(payload.username)

        if (!user) {
            throw new UnathorizedException()  
        }

        return user
    }

    public async editSelf(token: string, model: UserDto, avatar: IMulterFile): Promise<IWhoAmI> {
        const decodedToken = this.jwtService.decode(token)
        const user = await this.validateUser({username: decodedToken['username']})

        await this.userService.edit({...user, ...model}, avatar)

        return this.getWhoAmIFromUser(await this.userService.getUser(model.id), token)
    }

    private getWhoAmIFromUser(user: UserEntity | UserDto, token: string): IWhoAmI {
        return {
            id: user.id,
            username: user.username,
            loggedin: true,
            token: token,
            email: user.email,
            avatar: user.avatar
        }
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
