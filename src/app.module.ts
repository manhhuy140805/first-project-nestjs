import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { NoteModule } from './modules/note/note.module';
import { PrismaModule } from './modules/prisma/prisma.module';

@Module({
  imports: [UserModule, AuthModule, NoteModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
