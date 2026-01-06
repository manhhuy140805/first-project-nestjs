import { Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  register() {
    return {
      x: 123,
      y: 456,
      name: 'test register',
    };
  }

  @Post('/login')
  login() {
    return {
      x: 123,
      y: 456,
      name: 'test login',
    };
  }
}
