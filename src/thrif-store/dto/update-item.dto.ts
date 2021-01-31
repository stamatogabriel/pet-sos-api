import { ApiProperty } from '@nestjs/swagger';

export class UpdateItemDto {
  @ApiProperty()
  description?: string;

  @ApiProperty()
  quantity?: number;

  @ApiProperty()
  image?: string;
}
