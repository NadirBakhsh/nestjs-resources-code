import { Test, TestingModule } from '@nestjs/testing';
import { CreateGoogleUserProvider } from './create-google-user.provider';
import { CreateUserProvider } from './create-user.provider';
import { FindOneByGoogleIdProvider } from './find-one-by-google-id.provider';
import { FindOneUserByEmailProvider } from './find-one-user-by-email.provider';
import { UsersCreateManyProvider } from './users-create-many.provider';
import { UsersService } from './users.service';
import { DataSource } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../user.entity';
import { CreateUserDto } from '../dtos/create-user.dtos';

describe('User service', () => {
 
  let service: UsersService;
  beforeEach(async () => {
    const mockCreateUserProvider: Partial<CreateUserProvider> = {
      createUser: (createUserDto: CreateUserDto) => Promise.resolve({
        id: 1,
        firstName: createUserDto.firstName,
        lastName: createUserDto.lastName,
        email: createUserDto.email,
        password: createUserDto.password
      })
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: CreateGoogleUserProvider,
          useValue: { createGoogleUser: jest.fn() },
        },
        {
          provide: FindOneByGoogleIdProvider,
          useValue: { findOneByGoogleId: jest.fn() },
        },

        {
          provide: 'UserRepository',
          useValue: {},
        },
        {
          provide: UsersCreateManyProvider,
          useValue: { UsersCreateManyProvider: jest.fn() },
        },
        {
          provide: CreateUserProvider,
          useValue: mockCreateUserProvider,
        },
        {
          provide: FindOneUserByEmailProvider,
          useValue: { findOneByEmail: jest.fn() },
        },
        {
          provide: DataSource,
          useValue: {},
        },
        {
          provide: getRepositoryToken(User),
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  // create user test

  describe('createUser', () => {
    it('should be defined', () => {
      expect(service.createUser).toBeDefined();
    });

    it('should create a user', async () => {
      const createUserDto: CreateUserDto = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        password: 'password123',
      };
      const user = await service.createUser(createUserDto);
      expect(user).toBeDefined();
      expect(user.id).toBe(1);
      expect(user.firstName).toBe(createUserDto.firstName);
      expect(user.lastName).toBe(createUserDto.lastName);
      expect(user.email).toBe(createUserDto.email);
      expect(user.password).toBe(createUserDto.password);
    });
  });

});
