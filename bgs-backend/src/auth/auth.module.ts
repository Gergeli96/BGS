import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DbModule } from 'src/db/db.module';
import { UserEntity } from 'src/db/entities/user.entity';
import { AuthService } from 'src/services/auth.service';
import { UserService } from 'src/services/user.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwtStrategy';

@Module({
    controllers: [AuthController],
    providers: [UserService, AuthService, JwtStrategy],
    imports: [
        DbModule,
        TypeOrmModule.forFeature([UserEntity]),
        PassportModule.register({
            defaultStrategy: 'jwt',
            property: 'user',
            session: false,
        }),
        JwtModule.register({
            secret: 'secret',
            signOptions: {
                expiresIn: '1h'
            }
        })
    ],  
    exports: [
        PassportModule, 
        JwtModule
    ],
})
export class AuthModule { }
