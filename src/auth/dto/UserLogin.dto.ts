import { ApiProperty } from '@nestjs/swagger';

export class UserLogin {
  @ApiProperty({ required: true })
  email: string;

  @ApiProperty({ required: true })
  password: string;
}
