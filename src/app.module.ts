import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
    imports: [
        MongooseModule.forRoot('mongodb://localhost/mycrud'),
        JwtModule.registerAsync({
            useFactory: () => ({
                secret: 'Tu password secret'
            })
        }),
        UsersModule,
        AuthModule
    ],
    controllers: [AppController],
    providers: [AppService]
})
export class AppModule {}
