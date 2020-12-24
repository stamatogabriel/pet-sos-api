import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ required: true })
  username: string;

  @ApiProperty({ required: true })
  email: string;

  @ApiProperty()
  phone?: string;

  @ApiProperty()
  avatar?: string;

  @ApiProperty({ required: true })
  password: string;
}
