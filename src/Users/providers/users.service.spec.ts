import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';

describe('User service', () => {

  beforeEach(async () => {
    let service : UsersService;
    const module: TestingModule = await Test.createTestingModule({
        providers: [UsersService],
        controllers: [],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {});
  });

});
