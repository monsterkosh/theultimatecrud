import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
    getHello(): string {
        return `
    Welcome to my C.R.U.D: </br>
    </br>
    GET    /users </br>
    POST   /users </br>
    UPDATE /users:id </br>
    DELETE /users:id </br>
    `;
    }
}
