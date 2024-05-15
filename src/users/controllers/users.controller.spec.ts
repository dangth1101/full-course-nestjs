import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from '../services/users.service';

const mockUsersService = () => ({
  create: jest.fn(),
  findAll: jest.fn(),
  findById: jest.fn(),
});
describe('UsersController', () => {
  let controller: UsersController;
  let service: jest.Mocked<UsersService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: mockUsersService(),
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService, jest.Mocked<UsersService>>(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findById', () => {
    it('should return a user if one is found', async () => {
      const user = { id: 1, email: 'test@example.com', password: 'password', phone:'0123456789', isActive:true };
      service.findById.mockResolvedValue(user);

      const result = await controller.findById(1);
      expect(result).toEqual(user);
      expect(service.findById).toHaveBeenCalledWith(1);
    });

    it('should return null if no user is found', async () => {
      service.findById.mockResolvedValue(null);

      const result = await controller.findById(1);
      expect(result).toBeNull();
      expect(service.findById).toHaveBeenCalledWith(1);
    });
  });
});
