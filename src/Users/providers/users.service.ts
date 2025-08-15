import {
  BadRequestException,
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  RequestTimeoutException,
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthService } from 'src/auth/providers/auth.service';
import { Repository } from 'typeorm';
import profileConfig from '../config/profile.config';
import { CreateUserDto } from '../dtos/create-user.dtos';
import { GetUsersParamDto } from '../dtos/get-user-params.dto';
import { User } from '../user.entity';
import { UsersCreateManyProvider } from './users-create-many.provider';
import { CreateManyUsersDto } from '../dtos/create-many-users.dto';
import { CreateUserProvider } from './create-user.provider';

@Injectable()
export class UsersService {
  constructor(
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @Inject(profileConfig.KEY)
    private readonly profileConfiguration: ConfigType<typeof profileConfig>,

    /*
     * inject create many provider
     */
    private readonly usersCreateManyProvider: UsersCreateManyProvider,


    private readonly createUserProvider: CreateUserProvider,


  ) {}
  public findAll(
    getUsersParamDto: GetUsersParamDto,
    limit: number,
    page: number,
  ) {
    throw new HttpException(
      {
        statusCode: HttpStatus.MOVED_PERMANENTLY,
        error: 'This endpoint has been moved to a new location',
        fileName: 'src/users/providers/users.service.ts',
        lineNumber: 30,
      },
      HttpStatus.MOVED_PERMANENTLY,
      {
        cause: new Error(),
        description: 'This endpoint has been moved to a new location.',
      },
    );
  }

  public async createUser(createUserDto: CreateUserDto) {
    return await this.createUserProvider.createUser(createUserDto);
  }


  public async findOneById(userId: number) {
    let user = undefined;
    try {
      user = await this.usersRepository.findOneBy({ id: userId });
    } catch (error) {
      throw new RequestTimeoutException(
        'Unable to find user at this moment, please try again',
        {
          description:
            'User retrieval failed due to a timeout error. Please try again later.',
        },
      );
    }

    /*
     * handle the user does not exist case
     */
    if (!user) {
      throw new BadRequestException(`User with id ${userId} does not exist`, {
        description: 'User retrieval failed because the user does not exist.',
      });
    }

    return user;
  }

  /**
   * Creates multiple users.
   * 
   * @param createManyUsersDto - An array of CreateManyUsersDto objects.
   * @returns A promise that resolves to an array of User objects.
   */
  public async createMany(createManyUsersDto: CreateManyUsersDto){
    return await this.usersCreateManyProvider.createMany(createManyUsersDto);
  }

}
