import { ApiProperty } from '@nestjs/swagger';

export class CreateCreatorDto {
  @ApiProperty({
    description: 'O nome do produtor ou afiliado',
    example: 'André Dorneles',
  })
  name: string;

  @ApiProperty({
    description: 'Valor do saldo do produtor ou afiliado em centavos',
    example: 100000,
  })
  account_balance: number;
}
