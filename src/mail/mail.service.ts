import { Injectable, HttpException, HttpStatus } from '@nestjs/common';

import { MailerService } from '@nestjs-modules/mailer';

import { Mail } from './interfaces/mail';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  sendMail = async (mail: Mail): Promise<any> => {
    try {
      const response = await this.mailerService.sendMail({
        to: 'stamato7@gmail.com',
        from: 'admin@apva-paulinia.org',
        subject: mail.title,
        template: 'mail',
        attachments: mail.attachments,
        context: {
          name: mail.name,
          title: mail.title,
          message: mail.message,
          phone: mail.phone
        },
      });

      return response;
    } catch (error) {
      console.log(error)
      throw new HttpException(
        {
          message: 'Email not send',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  };
}
