import { Module } from '@nestjs/common';

import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

import { MailService } from './mail.service';
import { MailController } from './mail.controller';

@Module({
  imports: [
    MailerModule.forRootAsync({
      useFactory: () => ({
        //Mailtrap's user and password
        transport: {
          host: 'smtp.umbler.com',
          port: 587,
          auth: {
            user: 'admin@apva-paulinia.org',
            pass: 'Apva@2021',
          },
        },
        template: {
          dir: './src/templates',
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
      }),
    }),
  ],
  providers: [MailService],
  controllers: [MailController],
})
export class MailModule {}
