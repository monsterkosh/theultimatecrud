import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateUserDTO } from 'src/Dtos/create-user.dto';
import { AuthService } from '../Services/auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('/register')
    async registerUser(@Body() data: CreateUserDTO): Promise<any> {
        return this.authService.register(data.name, data.password);
    }

    @Post('/login')
    async loginUser(@Body() data: CreateUserDTO): Promise<any> {
        return this.authService.login(data.name, data.password);
    }
}
