import { ApiProperty } from '@nestjs/swagger';

export class CreateTransactionFileDto {
  @ApiProperty({
    description: 'Arquivo com transações a serem processadas.',
    type: 'string',
    format: 'binary',
  })
  file: Express.Multer.File;
}
