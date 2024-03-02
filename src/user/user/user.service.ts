import { Injectable, NotFoundException, UnauthorizedException,Param } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async addUser(data: User): Promise<User> {
    return this.prisma.user.create({ data });
  }

  async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds);
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
  async getUsersByName(firstName: string, lastName: string): Promise<User[]> {
    const users = await this.prisma.user.findMany({
      where: {
        OR: [
          { firstName: { equals: firstName } },
          { lastName: { equals: lastName } },
        ],
      },
    });
    if (!users || users.length === 0) {
      throw new NotFoundException(`No users found with name ${firstName} ${lastName}`);
    }
    return users;
  }
  
  async login(email: string, password: string): Promise<User | null> {
    const user = await this.prisma.user.findFirst({
      where: { email: email },
    });
  
    if (!user) {
      return null;
    }
  
    const passwordMatch = await bcrypt.compare(password, user.password);
  
    if (!passwordMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }
  
    return user;
  }
}
