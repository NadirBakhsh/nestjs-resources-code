import { Inject, Injectable, RequestTimeoutException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FindOneUserByEmailProvider {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  public async findOneByEmail(email: string) {
    let user: User | undefined = undefined;
    try {
      user = await this.usersRepository.findOneBy({
        email,
      });
    } catch (error) {

        throw new RequestTimeoutException('User not found',{
            description: 'The user with the provided email does not exist.',
        });
    }
    if(!user) {
      throw new RequestTimeoutException('User not found',{
        description: 'The user with the provided email does not exist.',
      });
    }
    return user;
  }
}
