import { ApiProperty } from '@nestjs/swagger';

export class RedefinePass {
  @ApiProperty({ required: true })
  password: string;

  @ApiProperty({ required: true })
  token: string;
}
