import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtLoginResponse } from 'src/Models/JwtLoginResponse';
import { User } from '../Models/user.schema';
import { CreateUsersResponse } from '../Models/create-users-response';
import { BcryptUtils } from 'src/Utils/bcrypt.utils';
import { JwtUtils } from '../Utils/jwt.utils';
import { uuid } from 'uuidv4';
import { AuthRepository } from '../Daos/auth.dao';

@Injectable()
export class AuthService {
    constructor(
        private readonly authRepository: AuthRepository,
        private readonly _jwtUtils: JwtUtils
    ) {}

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
        const userJwt: string = await this._jwtUtils.sign(name);
        return new JwtLoginResponse(userJwt);
    }
}
