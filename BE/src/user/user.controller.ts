import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}



  @Post('/register')
  register(@Body() body){
    
    return this.userService.register(body)
 
   }
   @Post('/login')
   login(@Body() body){
    return this.userService.login(body)
     
  }
 






}
