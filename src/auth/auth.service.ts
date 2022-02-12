import { BadRequestException, Injectable } from '@nestjs/common';
import { User } from 'src/schemas/user.schema';
import { CreateUsersResponse } from 'src/users/models/response/create-users-response';
import { BcryptUtils } from 'src/utils/bcrypt.utils';
import { uuid } from 'uuidv4';
import { AuthRepository } from './auth.repository';

@Injectable()
export class AuthService {
    constructor(private readonly authRepository: AuthRepository) {}

    async register(name: string, password: string): Promise<any> {
        const hashing = await BcryptUtils.generateSalt(password);

        const response: User = await this.authRepository.createUser({
            id: uuid(),
            name,
            password: hashing
        });

        return new CreateUsersResponse(response);
    }

    async login(name: string, password: string): Promise<any> {
        const findUser = await this.authRepository.findUserByName(name);
        if (!findUser) throw new BadRequestException('User not found');
        const decrypt = await BcryptUtils.comparePass(
            password,
            findUser.password
        );
        if (decrypt === false)
            throw new BadRequestException('Wrong Credentials');
        return decrypt;
    }
}
