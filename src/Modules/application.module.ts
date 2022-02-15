import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from '../Modules/auth.module';
import { UsersModule } from '../Modules/users.module';

@Module({
    imports: [
        JwtModule.registerAsync({
            useFactory: () => ({
                secret: 'Tu password secret'
            })
        }),
        UsersModule,
        AuthModule
    ],
    controllers: [],
    providers: []
})
export class ApplicationModule {}
