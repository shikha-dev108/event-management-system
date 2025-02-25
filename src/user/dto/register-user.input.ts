import { InputType, Field } from '@nestjs/graphql';
import { UserRole } from '../user.schema';

@InputType()
export class RegisterUserInput {
  @Field()
  name: string;

  @Field()
  email: string;

  @Field()
  password: string;

  @Field(() => UserRole, { nullable: true })
  role?: UserRole;
}