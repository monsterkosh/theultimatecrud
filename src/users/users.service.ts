import { BadRequestException, Injectable } from '@nestjs/common';
import { User } from 'src/schemas/user.schema';
import { uuid } from 'uuidv4';
import { UpdateUserDTO } from './dtos/update-user.dto';
import { CreateUsersResponse } from './models/response/create-users-response';
import { FindUserResponse } from './models/response/find-user-response';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
    constructor(private readonly usersRepository: UsersRepository) {}

    async getUsers(): Promise<Array<FindUserResponse>> {
        let response: Array<FindUserResponse> = [];
        const users: User[] = await this.usersRepository.find({});
        if (!users) throw new BadRequestException('error');
        response = users.map((obj) => {
            return new FindUserResponse(obj.id, obj.name);
        });
        return response;
    }

    async findUser(id: string): Promise<FindUserResponse> {
        const response: User = await this.usersRepository.findOne({ id });
        return new FindUserResponse(response.id, response.name);
    }

    async createUser(name: string, password: string): Promise<any> {
        const response: User = await this.usersRepository.create({
            id: uuid(),
            name,
            password
        });

        return new CreateUsersResponse(response);
    }

    async updateUser(id: string, userUpdates: UpdateUserDTO): Promise<User> {
        return this.usersRepository.findOneAndUpdate({ id }, userUpdates);
    }

    async deleteUser(id: number): Promise<FindUserResponse> {
        const response: User = await this.usersRepository.findOneAndDelete({
            id
        });

        return new FindUserResponse(response.id, response.name);
    }
}
