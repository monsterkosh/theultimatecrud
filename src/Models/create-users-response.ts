import { User } from '../Models/user.schema';

export class CreateUsersResponse {
    id: string;
    name: string;

    constructor(data: User) {
        this.id = data.id;
        this.name = data.name;
    }
}
