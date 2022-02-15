import {
    MongooseModuleOptions,
    MongooseOptionsFactory
} from '@nestjs/mongoose';

export class MongooseConfigService implements MongooseOptionsFactory {
    createMongooseOptions(): MongooseModuleOptions {
        return {
            uri: 'mongodb://localhost/mycrud'
        };
    }
}
