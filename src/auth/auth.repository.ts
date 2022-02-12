import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/schemas/user.schema';

@Injectable()
export class AuthRepository {
    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>
    ) {}

    async createUser(user: User): Promise<User> {
        const newUser = new this.userModel(user);
        return newUser.save();
    }

    async findUserByName(name: string): Promise<any> {
        const findedUser = await this.userModel.findOne({ name: name });
        return findedUser;
    }
}
