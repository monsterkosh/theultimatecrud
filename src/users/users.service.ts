import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/schemas/user.schema';
import { JwtUtils } from 'src/utils/jwt.utils';
import { UpdateUserDTO } from './dtos/update-user.dto';
import { FindUserResponse } from './models/response/find-user-response';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
    constructor(
        private readonly usersRepository: UsersRepository,
        private readonly _jwtUtils: JwtUtils
    ) {}

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
        const response: User = await this.usersRepository.findOneById(id);
        return new FindUserResponse(response.id, response.name);
    }

    async updateUser(
        id: string,
        userUpdates: UpdateUserDTO,
        token: string
    ): Promise<User> {
        if (!token) throw new BadRequestException('No token');
        const verifyToken = await this._jwtUtils.verify(token);
        if (!verifyToken)
            throw new BadRequestException('Token was manipulated');
        const userDb = await this.usersRepository.findOneById(id);
        if (!userDb) throw new BadRequestException('No user found');
        if (verifyToken.name != userDb.name)
            throw new BadRequestException('Token in nose was manipulated');
        return this.usersRepository.findOneAndUpdate(id, userUpdates);
    }

    async deleteUser(id: number): Promise<FindUserResponse> {
        const response: User = await this.usersRepository.findOneAndDelete({
            id
        });

        return new FindUserResponse(response.id, response.name);
    }
}
