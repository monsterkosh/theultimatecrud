import { Injectable } from '@nestjs/common';
import { sign, verify } from 'jsonwebtoken';

const secret = 'Tu password secret';

@Injectable()
export class JwtUtils {
    constructor() {}

    async sign(name: string): Promise<string> {
        const payload = {
            name: name
        };
        const newJwt = sign(payload, secret, { expiresIn: '1h' });
        return newJwt;
    }

    async verify(token: string): Promise<any> {
        const pepe = verify(token, secret);
        return pepe;
    }
}
