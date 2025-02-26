import { Controller, Get, Post, Body, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import {CreateUserDto} from './dto/register-user.input';
import {LoginUserDto} from './dto/login-user.input';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getHello(): string {
    return this.userService.testUserModule()
  }

  @Post('register')
  createUser(@Body() body: CreateUserDto): object {
    console.log('This logging works here toooo', body);
    const {name,password, role,email } = body;
    return this.userService.createUser(name,password, role,email);
  }

  @Delete('delete')
  deleteUser():string{
    return 'This is meant to delete user';
  }

  @Post('login')
  loginUser(@Body() reqBody: LoginUserDto): object {
    return this.userService.loginUser(reqBody.email, reqBody.password);
  }
}
