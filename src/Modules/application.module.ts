import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from '../Controllers/auth.controller';
import { AuthRepository } from '../Daos/auth.dao';
import { AuthService } from '../Services/auth.service';
import { AppController } from 'src/app.controller';
import { AppService } from 'src/app.service';
import { UsersService } from 'src/Services/users.service';
import { UsersRepository } from 'src/Daos/users.dao';
import { JwtUtils } from 'src/Utils/jwt.utils';
import { UsersController } from 'src/Controllers/users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/Models/Schema/user.schema';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                secret: Object.assign(configService.get<any>('JWT_SECRET_KEY'))
            })
        })
    ],
    controllers: [AppController, UsersController, AuthController],
    providers: [
        AppService,
        AuthService,
        UsersService,
        JwtUtils,
        UsersRepository,
        AuthRepository
    ]
})
export class ApplicationModule {}
