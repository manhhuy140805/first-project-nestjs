import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AuthDTO } from './dto';
import * as crypto from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

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
      throw new ForbiddenException('Invalid credentials');
    }
    const passwordMatches = await crypto.compare(
      authDTO.password,
      user.hashPassword,
    );
    if (!passwordMatches) {
      throw new ForbiddenException('Invalid credentials');
    }
    return await this.signTokenJWT(user.id, user.email);
  }

  async signTokenJWT(
    userId: number,
    email: string,
  ): Promise<{ token: string }> {
    const payload = { sub: userId, email };
    const token = await this.jwtService.signAsync(payload, {
      expiresIn: '1h',
      secret: process.env['JWT_SECRET'],
    });
    return { token };
  }
}
