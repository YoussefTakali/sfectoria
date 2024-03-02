// user.controller.ts
import { Controller, Post, Body, Param, Put, Delete, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '@prisma/client';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('add')
  async addUser(@Body() data: User): Promise<User> {
    return this.userService.addUser(data);
  }

  @Put(':id')
  async updateUser(@Param('id') id: string, @Body() data: User): Promise<User> {
    return this.userService.updateUser(id, data);
  }

  @Delete(':id')
  async removeUser(@Param('id') id: string): Promise<User> {
    return this.userService.removeUser(id);
  }
  @Get(':firstName/:lastName')
  async getUsersByName(@Param('firstName') firstName: string, @Param('lastName') lastName: string): Promise<User[]> {
    return this.userService.getUsersByName(firstName, lastName);
  }

}
