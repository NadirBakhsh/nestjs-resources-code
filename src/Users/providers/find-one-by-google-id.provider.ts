import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '../user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class FindOneByGoogleIdProvider {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>, // Replace 'any' with the actual type of your user repository
  ) {}

  public async findOneByGoogleId(googleId: string) {
    return this.usersRepository.findOneBy({ googleId });
  }
}
