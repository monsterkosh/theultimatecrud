import * as path from 'path';
import * as Dotenv from 'dotenv';

export const envSelector = (): string => {
    let envEntorno;
    switch (process.env.CRUD) {
        case 'dev':
            envEntorno = Dotenv.config({
                path: path.resolve(__dirname, '../../.env.dev')
            }).parsed;
            break;
        default:
            envEntorno = '.env';
    }
    return envEntorno;
};
