import { ApiProperty } from '@nestjs/swagger';
import { Types } from 'mongoose';

export class UpdatePetDto {
  @ApiProperty()
  name?: string;

  @ApiProperty()
  age?: string;

  @ApiProperty({ required: true })
  type?: string;

  @ApiProperty({ required: true, default: false })
  adopted?: boolean;

  @ApiProperty()
  adoptedBy?: Types.ObjectId;

  @ApiProperty({ required: true })
  foundIn?: Date;

  @ApiProperty()
  observations?: string;
}
