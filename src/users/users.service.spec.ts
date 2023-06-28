import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getModelToken, SequelizeModule } from '@nestjs/sequelize';
import { User } from './entities/user.entity';
import { UsersController } from './users.controller';

const usersArray = [
  {
    name: 'Admin',
    email: 'admin@example.com',
    role: 'ADMIN',
  },
  {
    name: 'Manager',
    email: 'manager@example.com',
    role: 'Manager',
  },
];

const oneUser = usersArray[0];

describe('UsersService', () => {
  let service: UsersService;
  let model: typeof User;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [SequelizeModule.forFeature([User])],
      controllers: [UsersController],
      providers: [
        UsersService,
        {
          provide: getModelToken(User),
          useValue: {
            findAll: jest.fn(() => usersArray),
            findOne: jest.fn(),
            create: jest.fn(() => oneUser),
            remove: jest.fn(),
            destroy: jest.fn(() => oneUser),
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    model = module.get<typeof User>(getModelToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
