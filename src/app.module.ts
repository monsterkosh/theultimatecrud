import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseConfigService } from './Configs/mongo.config';
import { ApplicationModule } from './Modules/application.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true
        }),
        MongooseModule.forRootAsync({
            useClass: MongooseConfigService
        }),
        ApplicationModule
    ],
    controllers: [AppController],
    providers: [AppService]
})
export class AppModule {}
