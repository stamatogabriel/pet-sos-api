import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { PetsModule } from './pets/pets.module';
import { AuthModule } from './auth/auth.module';
import { MailModule } from './mail/mail.module';
import { ThrifStoreModule } from './thrif-store/thrif-store.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env' }),
    MongooseModule.forRoot(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false
    }),
    UserModule,
    PetsModule,
    AuthModule,
    MailModule,
    ThrifStoreModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
