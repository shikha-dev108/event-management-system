// src/user/user.resolver.ts
import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './user.schema';
import { RegisterUserInput } from './dto/register-user.input';
import { UserRole } from './user.schema';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => User)
  async registerUser(
    @Args('input') input: RegisterUserInput,
  ): Promise<User> {
    return this.userService.createUser(
      input.name,
      input.email,
      input.password,
      input.role || UserRole.Participant,
    );
  }
}