import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AuthDTO } from './dto';
import * as crypto from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private prismaService: PrismaService) {}

  async register(authDTO: AuthDTO) {
    const hashedPassword = await crypto.hash(authDTO.password, 10);
    try {
      const user = await this.prismaService.user.create({
        data: {
          email: authDTO.email,
          hashPassword: hashedPassword,
          firstName: 'John',
          lastName: 'Doe',
        },
        select: {
          id: true,
          email: true,
          createdAt: true,
        },
      });
      return user;
    } catch (error) {
      if (error instanceof Error && 'code' in error && error.code === 'P2002') {
        throw new ForbiddenException('Email already exists');
      }
      throw error;
    }
  }

  async login(authDTO: AuthDTO) {
    const user = await this.prismaService.user.findUnique({
      where: {
        email: authDTO.email,
      },
    });
    if (!user) {
      throw new ForbiddenException('Email already exists');
    }
    const paasswordMatches = await crypto.compare(
      authDTO.password,
      user.hashPassword,
    );
    if (!paasswordMatches) {
      throw new ForbiddenException('Incorrect password');
    }
    return user;
  }
}
