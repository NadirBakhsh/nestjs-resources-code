import {
    BadRequestException,
    forwardRef,
    Inject,
    Injectable,
    RequestTimeoutException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user.entity';
import { HashingProvider } from 'src/auth/providers/hashing.provider';
import { CreateUserDto } from '../dtos/create-user.dtos';
import { MailService } from 'src/mail/providers/mail.service';

@Injectable()
export class CreateUserProvider {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,

    /*
     * inject hashing provider
     */
    @Inject(forwardRef(() => HashingProvider))
    private readonly hashingProvider: HashingProvider, // Assuming HashingProvider is the correct type for hashing provider

    private readonly mailService: MailService
  ) {}
  public async createUser(createUserDto: CreateUserDto) {
    let userExists = undefined;

    try {
      userExists = await this.usersRepository.findOne({
        where: { email: createUserDto.email },
      });
    } catch (error) {
      throw new RequestTimeoutException(
        'unable to create user at this moment, please try again',
        {
          description:
            'User creation failed due to a timeout error. Please try again later.',
        },
      );
    }

    // Handle exception
    if (userExists) {
      throw new BadRequestException('User with this email already exists', {
        description:
          'User creation failed because the email is already in use.',
      });
    }

    // create a new user
    let newUser = this.usersRepository.create({
        ...createUserDto,
        password: await this.hashingProvider.hashPassword(createUserDto.password), // Hash the password using the hashing provider
    });

    try {
      newUser = await this.usersRepository.save(newUser);
    } catch (error) {
      throw new RequestTimeoutException(
        'Unable to save user at this moment, please try again',
        {
          description:
            'User creation failed due to a timeout error. Please try again later.',
        },
      );
    }

    try {
      await this.mailService.sendUserWelcomeEmail(newUser);
    } catch (error) {
      throw new RequestTimeoutException(
        'Unable to send welcome email at this moment, please try again',
        {
          description:
            'Sending welcome email failed due to a timeout error. Please try again later.',
        },
      );
    }

    return newUser;
  }
}
