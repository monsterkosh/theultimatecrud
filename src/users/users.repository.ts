import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { User, UserDocument } from 'src/schemas/user.schema';

@Injectable()
export class UsersRepository {
    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>
    ) {}

    async findOne(usersFilterQuery: FilterQuery<User>): Promise<User> {
        return this.userModel.findOne(usersFilterQuery);
    }

    async find(usersFilterQuery: FilterQuery<User>): Promise<User[]> {
        return this.userModel.find(usersFilterQuery);
    }

    async create(user: User): Promise<User> {
        const newUser = new this.userModel(user);
        return newUser.save();
    }

    async findOneAndUpdate(
        usersFilterQuery: FilterQuery<User>,
        user: Partial<User>
    ): Promise<User> {
        return this.userModel.findOneAndUpdate(usersFilterQuery, user);
    }

    async findOneAndDelete(usersFilterQuery: FilterQuery<User>): Promise<User> {
        return this.userModel.findOneAndRemove(usersFilterQuery);
    }
}
