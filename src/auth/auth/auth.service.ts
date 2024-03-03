import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Employees } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { ApiBadRequestResponse, ApiBody, ApiInternalServerErrorResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthDto } from 'src/dto';

@Injectable()
@ApiTags('auth')
export class AuthService {
    constructor(private prisma: PrismaService) {}

    @ApiOperation({ summary: 'User login' })
    @ApiBody({ description: 'User email and password', type: Object })
    @ApiOkResponse({ description: 'User logged in successfully', type: AuthDto })
    @ApiBadRequestResponse({ description: 'Invalid email or password' })
    @ApiInternalServerErrorResponse({ description: 'Internal server error' })
    async login(credentials): Promise<Employees | null> {
        const { email, password } = credentials;
        const user = await this.prisma.employees.findFirst({
            where: { email: email },
        });

        if (!user) {
            return null;
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            throw new UnauthorizedException("Your login credentials don't match an account in our system.");
        }

        return user;
    }
}
