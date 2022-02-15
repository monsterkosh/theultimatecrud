import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../Models/user.schema';
import { JwtUtils } from 'src/Utils/jwt.utils';
import { UsersController } from '../Controllers/users.controller';
import { UsersRepository } from '../Daos/users.repository';
import { UsersService } from '../Services/users.service';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])
    ],
    controllers: [UsersController],
    providers: [UsersService, UsersRepository, JwtUtils]
})
export class UsersModule {}
