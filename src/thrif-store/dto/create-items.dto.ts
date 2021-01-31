import { ApiProperty } from '@nestjs/swagger';

export class CreateItemDto {
  @ApiProperty({ required: true })
  description: string;

  @ApiProperty({ required: true })
  quantity: number;
}
