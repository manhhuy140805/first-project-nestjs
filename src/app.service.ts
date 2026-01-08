import { Injectable } from '@nestjs/common';
import { PrismaService } from './modules/prisma/prisma.service';

@Injectable()
export class AppService {
  constructor(private readonly prismService: PrismaService){}
  getHello(): Promise<any> {
    return this.prismService.user.findMany();
  }
}
