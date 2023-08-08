import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class ErrorDtoResponse {
  @ApiProperty({
    description: 'Status Code',
  })
  @IsString()
  readonly statusCode: number;

  @ApiProperty({
    description: 'Request Payload',
  })
  @IsString()
  readonly payload: any;

  @ApiProperty({
    description: 'Error Message',
  })
  @IsString()
  readonly message: string;
}
