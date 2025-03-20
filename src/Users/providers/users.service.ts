import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { GetUsersParamDto } from '../dtos/get-user-params.dto';
import { AuthService } from 'src/auth/providers/auth.service';
import { Repository } from 'typeorm';
import { User } from '../user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from '../dtos/create-user.dtos';

@Injectable()
export class UsersService {
  constructor(
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
    @InjectRepository(User)
    private usersRepository: Repository<User>
  ) {}
  public findAll(
    getUsersParamDto: GetUsersParamDto,
    limit: number,
    page: number,
  ) {
    const isAuth = this.authService.isAuth();
    console.log(isAuth);
    return [
      { firstName: 'John', email: 'john@example.com' },
      { firstName: 'Jane', email: 'jane@example.com' },
    ];
  }

  public async createUser(createUserDto: CreateUserDto) {
    // check is user sxsists with same email
    const userExists = await this.usersRepository.findOne({
      where: { email: createUserDto.email },
    })

    console.log('userExists', userExists)

    // Handle exception
    
    // create a new user
    let newUser = this.usersRepository.create(createUserDto);
    newUser = await this.usersRepository.save(newUser);
    return newUser;
  }



  findOneById(userId: string) {
    return { userId: 123, firstName: 'John', email: 'john@example.com' };
  }
}
