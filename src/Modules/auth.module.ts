import { Module } from '@nestjs/common';
import { AuthService } from '../Services/auth.service';
import { AuthController } from '../Controllers/auth.controller';
import { AuthRepository } from '../Daos/auth.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../Models/user.schema';
import { JwtUtils } from 'src/Utils/jwt.utils';
import { JwtModule } from '@nestjs/jwt';

const secret = process.env.JWT_SECRET_KEY;
// console.log(secret);

@Module({
    imports: [
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
        JwtModule.registerAsync({
            useFactory: () => ({
                secret: 'Tu password secret'
            })
        })
    ],
    providers: [AuthService, AuthRepository, JwtUtils],
    controllers: [AuthController]
})
export class AuthModule {}
