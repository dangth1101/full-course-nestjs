import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { Repository } from 'typeorm';
import { User } from '../entities/users.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateUserDTO } from '../dtos/create_user.dto';
import { UpdateUserDTO } from '../dtos/update_user.dto';

const mockUserRepository = () => ({
  find: jest.fn(),
  findOneBy: jest.fn(),
  save: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
});

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;

describe('UsersService', () => {
  let service: UsersService;
  let repository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    repository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new user', async () => {
      const createUserDTO: CreateUserDTO = {
        password: '0123456789',
        email: 'john@example.com',
        phone: '123456789',
      };
      const user: User = { id: 1, ...createUserDTO, isActive: true };

      jest.spyOn(repository, 'create').mockReturnValue(user);
      jest.spyOn(repository, 'save').mockResolvedValue(user);

      expect(await service.create(createUserDTO)).toEqual(user);
    });
  });

  describe('findAll', () => {
    it('should return all users', async () => {
      const users: User[] = [
        {
          id: 1,
          email: 'john@example.com',
          phone: '123456789',
          password: 'password123',
          isActive: true,
        },
      ];

      jest.spyOn(repository, 'find').mockResolvedValue(users);

      expect(await service.findAll()).toEqual(users);
    });
  });

  describe('findById', () => {
    it('should return a single user by id', async () => {
      const user: User = {
        id: 1,
        email: 'john@example.com',
        phone: '123456789',
        password: 'password123',
        isActive: true,
      };

      jest.spyOn(repository, 'findOneBy').mockResolvedValue(user);

      expect(await service.findById(1)).toEqual(user);
    });
  });

  describe('findByEmail', () => {
    it('should return a single user by email', async () => {
      const user: User = {
        id: 1,
        email: 'john@example.com',
        phone: '123456789',
        password: 'password123',
        isActive: true,
      };

      jest.spyOn(repository, 'findOneBy').mockResolvedValue(user);

      expect(await service.findByEmail('john@example.com')).toEqual(user);
    });
  });

  describe('findByPhone', () => {
    it('should return a single user by phone', async () => {
      const user: User = {
        id: 1,
        email: 'john@example.com',
        phone: '123456789',
        password: 'password123',
        isActive: true,
      };

      jest.spyOn(repository, 'findOneBy').mockResolvedValue(user);

      expect(await service.findByPhone('123456789')).toEqual(user);
    });
  });

  describe('update', () => {
    it('should update a user', async () => {
      const updateUserDTO: UpdateUserDTO = {
        email: 'john@example.com',
        phone: '123456789',
        password: 'password123',
      };

      jest.spyOn(repository, 'update').mockResolvedValue(undefined);

      expect(await service.update(1, updateUserDTO)).toBeUndefined();
    });
  });

  describe('remove', () => {
    it('should remove a user', async () => {
      jest.spyOn(repository, 'delete').mockResolvedValue(undefined);

      expect(await service.remove(1)).toBeUndefined();
    });
  });
});
