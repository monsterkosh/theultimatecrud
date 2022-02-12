import { genSalt, hash, compare } from 'bcrypt';

const saltRounds = 10;

export class BcryptUtils {
    public static async generateSalt(password: string): Promise<string> {
        const salt = await genSalt(saltRounds);
        const hashed = await hash(password, salt);
        return hashed;
    }

    public static async comparePass(
        password: string,
        dbPassword: string
    ): Promise<boolean> {
        const match = await compare(password, dbPassword);
        return match;
    }
}
