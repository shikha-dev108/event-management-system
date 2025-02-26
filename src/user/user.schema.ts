import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export enum UserRole {
  Admin = 'Admin',
  Organizer = 'Organizer',
  Participant = 'Participant',
}

@Schema()
export class User extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ enum: UserRole, default: UserRole.Participant })
  role: UserRole;
}

export const UserSchema = SchemaFactory.createForClass(User);