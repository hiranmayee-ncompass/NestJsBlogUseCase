// // auth/user.controller.ts
// import { Controller, Post, Body, Get } from '@nestjs/common';
// import { UserService } from '../services/user.service';
// import { CreateUserDto } from '../dto/user.dto';

// @Controller('user')
// export class UserController {
//     constructor(private readonly userService: UserService) {}

//     @Get()
//     getHello(): string {
//       return "Testing";
//     }

//     @Post('/registerUser')
//     async registerUser(@Body() createUserDto: CreateUserDto) {
//         return this.userService.registerUser(createUserDto);
//     }
// }
import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
  } from '@nestjs/common';
  import { UserService } from '../services/user.service';
  import { CreateUserDto } from '../dto/user.dto';
//   import { UpdateUserDto } from './dto/update-user.dto';
  
  @Controller('user')
  export class UserController {
    constructor(private readonly userService: UserService) {}
  
    @Post("/register")
    create(@Body() createUserDto: CreateUserDto) {
      return this.userService.create(createUserDto);
    }
  
    @Get()
    findAll() {
      return this.userService.findAll();
    }
  
    @Get(':id')
    findOne(@Param('id') id: string) {
      return this.userService.findOne(+id);
    }
  
    // @Patch(':id')
    // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    //   return this.userService.update(+id, updateUserDto);
    // }
  
    @Delete(':id')
    remove(@Param('id') id: string) {
      return this.userService.remove(+id);
    }
  }