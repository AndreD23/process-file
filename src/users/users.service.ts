import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
  ) {}

  /**
   * Responsable for create user row at database
   * @param createUserDto
   */
  create(createUserDto: CreateUserDto) {
    return this.userModel.create(createUserDto as any);
  }

  /**
   * Get all users of the database
   */
  findAll() {
    return this.userModel.findAll();
  }

  /**
   * Get one user of the database by id
   * @param id User Id at database
   */
  findOne(id: number) {
    return this.userModel.findOne({
      where: { id },
    });
  }
}
