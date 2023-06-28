import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    description: 'O nome do usuário',
    example: 'André Dorneles',
  })
  name: string;

  @ApiProperty({
    description: 'E-mail utilizado para login',
    example: 'email@example.com',
  })
  email: string;

  @ApiProperty({
    description: 'Senha utilizada para login',
  })
  password: string;

  @ApiProperty({
    description:
      'Perfil do usuário. Será utilizado de acordo com as responsabilidades do usuário dentro do sistema',
    enum: ['ADMIN', 'MANAGER', 'DEVELOPER'],
  })
  role: string;
}
