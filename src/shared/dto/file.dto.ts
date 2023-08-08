import { ApiProperty } from '@nestjs/swagger';

export class RequestFileDto {
  @ApiProperty({ type: 'string', format: 'binary', required: true })
  attachment: Express.Multer.File;
}
