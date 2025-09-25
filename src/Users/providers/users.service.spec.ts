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

describe('User service', () => {
  beforeEach(async () => {
    let service: UsersService;
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
          useValue: { CreateUserProvider: jest.fn() },
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

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(service).toBeDefined();
    });
  });
});
