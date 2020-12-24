import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty()
  username?: string;

  @ApiProperty()
  email?: string;

  @ApiProperty()
  phone?: string;

  @ApiProperty()
  avatar?: string;

  @ApiProperty()
  password?: string;
}
