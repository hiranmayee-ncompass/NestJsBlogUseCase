import { Controller, Get, Post, Request } from '@nestjs/common';
import { AppService } from './app.service';
// import { User } from './users/entities/user.entity';

@Controller("user")
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
  
    return this.appService.getHello();
  }
  // @Post("/registerUser")
  // registration(@Request() req): any{
  //   return "Test";
  // }


}
