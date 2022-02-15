import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Headers,
    Query
} from '@nestjs/common';
import GetUsersRequest from '../Models/GetUsersRequest';
import { User } from '../Models/user.schema';
import { UpdateUserDTO } from '../Dtos/update-user.dto';
import { FindUserResponse } from '../Models/find-user-response';
import { UsersService } from '../Services/users.service';

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
