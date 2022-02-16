import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { sign, verify } from 'jsonwebtoken';

@Injectable()
export class JwtUtils {
    constructor() {}

    secret: string = process.env.JWT_SECRET_KEY;

    async sign(name: string): Promise<string> {
        const payload = {
            name: name
        };
        const newJwt = sign(payload, this.secret, { expiresIn: '1h' });
        return newJwt;
    }

    async verify(token: string): Promise<any> {
        const vertifiedToken = verify(token, this.secret);
        return vertifiedToken;
    }
}
