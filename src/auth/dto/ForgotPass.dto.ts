import { ApiProperty } from '@nestjs/swagger';

export class ForgotPass {
  @ApiProperty({ required: true })
  email: string;
}
