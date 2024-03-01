import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService){}

    async addUser(data: User): Promise<User> {
        return this.prisma.user.create({ data });
      }
    
      async updateUser(id: string, data: User): Promise<User> {
        const user = await this.prisma.user.update({
          where: { id },
          data,
        });
        if (!user) {
          throw new NotFoundException(`User with ID ${id} not found`);
        }
        return user;
      }
    
      async removeUser(id: string): Promise<User> {
        const user = await this.prisma.user.delete({
          where: { id },
        });
        if (!user) {
          throw new NotFoundException(`User with ID ${id} not found`);
        }
        return user;
      }
    }