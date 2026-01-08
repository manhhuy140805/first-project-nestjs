import { Injectable, Req } from '@nestjs/common';

@Injectable()
export class UserService {
  getProfile(@Req() req: Request) {
    return req['user'];
  }
}
