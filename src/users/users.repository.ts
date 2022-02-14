import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { User, UserDocument } from 'src/schemas/user.schema';
import { UpdateUserDTO } from './dtos/update-user.dto';

@Injectable()
export class UsersRepository {
    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>
    ) {}

    async findOneById(id: string): Promise<User> {
        return this.userModel.findOne({ id: id });
    }

    async find(usersFilterQuery: FilterQuery<User>): Promise<User[]> {
        return this.userModel.find(usersFilterQuery);
    }

    async create(user: User): Promise<User> {
        const newUser = new this.userModel(user);
        return newUser.save();
    }

    async findOneAndUpdate(id: string, user: UpdateUserDTO): Promise<User> {
        return this.userModel.findOneAndUpdate({ id: id }, user);
    }

    async findOneAndDelete(usersFilterQuery: FilterQuery<User>): Promise<User> {
        return this.userModel.findOneAndRemove(usersFilterQuery);
    }
}
