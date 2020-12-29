import { ApiProperty } from '@nestjs/swagger';

export class Mail {
  @ApiProperty({ required: true })
  name: string;

  @ApiProperty({ required: true })
  email: string;

  @ApiProperty({ required: true })
  phone: string;

  @ApiProperty({ required: true })
  message: string;

  @ApiProperty({ required: true })
  title: string;

  @ApiProperty({ required: false })
  attachments: any;
}
