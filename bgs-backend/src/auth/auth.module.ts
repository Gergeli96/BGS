import { FileUploadService } from 'src/services/file-upload.service';
import { UserEntity } from 'src/db/entities/user.entity';
import { AuthService } from 'src/services/auth.service';
import { UserService } from 'src/services/user.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtStrategy } from './jwtStrategy';
import { DbModule } from 'src/db/db.module';
import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';

@Module({
    controllers: [AuthController],
    providers: [UserService, FileUploadService, AuthService, JwtStrategy],
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
