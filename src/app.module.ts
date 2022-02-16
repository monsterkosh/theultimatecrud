import { Module } from '@nestjs/common';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { envSelector } from './Configs/envSelector';
import { nestEnvConfiguration } from './Configs/nestEnvConfiguration';
import { MongooseModule } from '@nestjs/mongoose';
import { MongooseConfigService } from './Configs/mongo.config';
import { ApplicationModule } from './Modules/application.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: [envSelector()],
            load: [nestEnvConfiguration],
            isGlobal: true
        }),
        MongooseModule.forRootAsync({
            useClass: MongooseConfigService
        }),
        ApplicationModule
    ],
    providers: []
})
export class AppModule {}
