import { UnathorizedException } from "src/exceptions/unatorized.exception";
import { BadRequest } from "src/exceptions/badrequest.exception";
import { UserEntity } from "src/db/entities/user.entity";
import { LoginDto, UserDto } from "src/dto/user.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(UserEntity) private userRepository: Repository<UserEntity>
    ) { }


    public async getUser(id: number): Promise<UserEntity> {
        return await this.userRepository.findOne({where: {id: id}})
    }

    public async getUserByUsername(username: string): Promise<UserEntity> {
        return await this.userRepository.findOne({where: {username: username}})
    }

    public async findByLogin({ username, password }: LoginDto): Promise<UserEntity> {    
        const user = await this.userRepository.findOne({ where: { username } })
        
        if (!user) {
            throw new UnathorizedException()
        }
          
        const areEqual = await this.comparePasswords(user.password, password)
        
        if (!areEqual) {
            throw new UnathorizedException()   
        }
        
        return user 
    }

    public async create(userDto: UserDto): Promise<UserEntity> {
        const userInDb = await this.getUserByUsername(userDto.username)

        if (userInDb) {
            throw new BadRequest()    
        }
        
        const user: UserEntity = await this.userRepository.create(userDto)

        return await this.userRepository.save(user)  
    }



    private comparePasswords(userPassport: string, loginPassport: string): boolean {
        return true
    }
}
