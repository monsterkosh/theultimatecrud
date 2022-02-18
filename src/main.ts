import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const configService = app.get(ConfigService);
    const swaggerDocument = require('./Configs/openapi.json');
    SwaggerModule.setup('/', app, swaggerDocument);
    const port = configService.get('PORT');
    await app.listen(port);
}
bootstrap();
