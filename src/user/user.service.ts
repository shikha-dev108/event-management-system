import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User, UserRole } from './user.schema';
import { error } from 'console';
import * as jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';


@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async createUser(
    name: string,
    password: string,
    role: string,
    email: string
  ): Promise<User> {
    console.log("###", name,password,role,email);
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new this.userModel({
      name,password: hashedPassword,role,email
    })
    const savedUser = await newUser.save();
    return savedUser;
  }

  async loginUser(
    username: string,
    password: string
  ): Promise<object> {
    console.log("@@@", username);    
    const foundUser= await this.userModel.findOne({email: username});
    console.log("####", foundUser);
    
    if(!foundUser)
    return{error: "user doesnot exist!!"}; 

    const checkPassword = await bcrypt.compare(password, foundUser.password); 
    console.log({checkPassword});
    if(!checkPassword)
      return {error: "Incorrect password!"}
    
    const jwtSecretKey = 'awxsecdrvftbghnj3456t7yu8iedfvbghn4567'; // hardcoded temporary, will remove later
    const data = {
        createdAt: Date(),
        userId: foundUser._id,
        role: foundUser.role
    }
    const token = jwt.sign(data, jwtSecretKey);
    return {foundUser,token};
  }

  testUserModule(): string{
    return 'THIS IS RUNNING!!!!!';
  }
}