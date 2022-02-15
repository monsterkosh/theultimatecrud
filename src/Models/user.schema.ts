import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
    @Prop()
    public name: string;

    @Prop()
    public password: string;

    @Prop()
    public id: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
