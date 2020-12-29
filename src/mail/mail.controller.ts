import { Post, Body, Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { Mail } from './dto/mail.dto';

import { MailService } from './mail.service';

@ApiTags('Mail')
@Controller('mail')
export class MailController {
  constructor(private readonly mail: MailService) {}

  @Post()
  async sendMail(@Body() email: Mail) {
    return this.mail.sendMail(email);
  }
}
