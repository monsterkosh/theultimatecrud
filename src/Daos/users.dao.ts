import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import GetUsersRequest from '../Models/get-users-request';
import { User, UserDocument } from '../Models/Schema/user.schema';
import { UpdateUserDTO } from '../Dtos/update-user.dto';

@Injectable()
export class UsersRepository {
    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>
    ) {}

    async findOneById(id: string): Promise<User> {
        return this.userModel.findOne({ id: id });
    }

    async find(usersFilterQuery: GetUsersRequest): Promise<User[]> {
        const users = this.userModel.find({});

        if (usersFilterQuery.limit) {
            users.limit(usersFilterQuery.limit);
        }

        if (usersFilterQuery.name) {
            users.where({ name: usersFilterQuery.name });
        }

        if (usersFilterQuery.id) {
            users.where({ id: usersFilterQuery.id });
        }

        return users;
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
