import { UnathorizedException } from "src/exceptions/unatorized.exception";
import { BadRequest } from "src/exceptions/badrequest.exception";
import { IMulterFile } from "src/interfaces/file.interfaces";
import { FileUploadService } from "./file-upload.service";
import { UserEntity } from "src/db/entities/user.entity";
import { LoginDto, UserDto } from "src/dto/user.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, UpdateResult } from "typeorm";
import { Injectable } from "@nestjs/common";
import * as bcrypt from "bcrypt"

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(UserEntity) private userRepository: Repository<UserEntity>,
        private fileService: FileUploadService
    ) { }


    public async getUser(id: number): Promise<UserEntity> {
        return await this.userRepository.findOne({where: {id: id}})
    }

    public async getUserByUsername(username: string): Promise<UserEntity> {
        return await this.userRepository.findOne({where: {username: username}})
    }

    public async findByLogin({ username, password }: LoginDto): Promise<UserEntity> {
        const user = await this.userRepository.findOne({ where: { username: username } })
        
        if (!user) {
            throw new UnathorizedException()
        }
          
        const areEqual = await this.comparePasswords(user.password, password)
        
        if (!areEqual) {
            throw new UnathorizedException('Hibás bejelentkezési adatok!')   
        }
        
        return user 
    }

    public async create(userDto: UserDto, avatar: IMulterFile): Promise<UserEntity> {
        const userInDb = await this.getUserByUsername(userDto.username)

        if (userInDb) {
            throw new BadRequest()    
        }

        if (avatar) {
            const avatarImageName = await this.fileService.uploadFile(avatar)
            userDto.avatar = avatarImageName
        }
        
        const user: UserEntity = await this.userRepository.create(userDto)

        return await this.userRepository.save(user)  
    }

    public async edit(userDto: UserDto, avatar: IMulterFile): Promise<UpdateResult> {
        const user = await this.userRepository.findOneOrFail({where: {id: userDto.id}})

        if (user.avatar && user.avatar?.length > 0) {
            await this.fileService.deleteFile(user.avatar)
        }

        if (avatar) {
            userDto.avatar = await this.fileService.uploadFile(avatar)
        }

        return await this.userRepository.update(userDto.id, userDto)
    }

    private async comparePasswords(userPassport: string, loginPassport: string): Promise<boolean> {
        return await bcrypt.compare(loginPassport, userPassport)
    }
}
