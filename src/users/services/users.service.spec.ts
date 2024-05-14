import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { Repository } from 'typeorm';
import { User } from '../entities/users.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateUserDTO } from '../dtos/create_user.dto';

const mockUserRepository = () => ({
  // find: jest.fn(),
  findOneBy: jest.fn(),
  // save: jest.fn(),
  create: jest.fn(),
  // update: jest.fn(),
  // delete: jest.fn(),
});

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;

describe('UsersService', () => {
  let service: UsersService;
  let repository: MockRepository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: mockUserRepository(),
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    repository = module.get<MockRepository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new user', async () => {
      const createUserDTO: CreateUserDTO = {
        email: 'test@example.com',
        phone: '0123456789',
        password: 'password',
      };
      const user = { id: 1, ...createUserDTO };
      repository.create.mockReturnValue(user);
      repository.save.mockResolvedValue(user);

      const result = await service.create(createUserDTO);
      expect(result).toEqual(user);
      expect(repository.create).toHaveBeenCalledWith(createUserDTO);
      expect(repository.save).toHaveBeenCalledWith(user);
    });
  });

  describe('findById', () => {
    it('should return a user with same Id', async () => {
      const user = { id: 1, email: 'test@test.com', password: 'example' };
      repository.findOneBy.mockResolvedValue(user);

      const result = await service.findById(1);
      expect(result).toEqual(user);
      expect(repository.findOneBy).toHaveBeenCalledWith({ id: 1 });
    });

    it('should return null if no user found', async () => {
      const user = null;
      repository.findOneBy.mockResolvedValue(null);

      const result = await service.findById(1);
      expect(result).toBeNull();
      expect(repository.findOneBy).toHaveBeenCalledWith({ id: 1 });
    });
  });
});
