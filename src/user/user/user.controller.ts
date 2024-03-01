// user.controller.ts
import { Controller, Post, Body, Param, Put, Delete, NotFoundException } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '@prisma/client';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
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
}
