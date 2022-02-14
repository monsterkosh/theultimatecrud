import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    UseGuards,
    Headers,
    Query
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import GetUsersRequest from 'src/models/Request/GetUsersRequest';
import { User } from 'src/schemas/user.schema';
import { CreateUserDTO } from './dtos/create-user.dto';
import { UpdateUserDTO } from './dtos/update-user.dto';
import { FindUserResponse } from './models/response/find-user-response';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService) {}

    @Get()
    async getUsers(
        @Query() queryFilters: GetUsersRequest
    ): Promise<FindUserResponse[]> {
        return this.userService.getUsers(queryFilters);
    }

    @Get(':id')
    async findUser(@Param('id') id: string): Promise<FindUserResponse> {
        return this.userService.findUser(id);
    }

    @Patch(':id')
    async updateUser(
        @Param('id') id: string,
        @Headers('Authorization') token: string,
        @Body() updateUserDTO: UpdateUserDTO
    ): Promise<User> {
        return this.userService.updateUser(id, updateUserDTO, token);
    }

    @Delete(':id')
    async deleteUser(@Param('id') id: number): Promise<FindUserResponse> {
        return this.userService.deleteUser(id);
    }
}
