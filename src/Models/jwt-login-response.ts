export class JwtLoginResponse {
    token: string;

    constructor(token?: string) {
        this.token = token ? token : null;
    }
}
