import { ConflictException, Injectable } from '@nestjs/common';
import { User } from '../user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { GoogleUser } from '../../auth/interfaces/google-user.interface';

@Injectable()
export class CreateGoogleUserProvider {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}

    public async createGoogleUser(googleUser: GoogleUser){
        try {
            const newUser = this.userRepository.create({
                email: googleUser.email,
                firstName: googleUser.firstName,
                lastName: googleUser.lastName,
                googleId: googleUser.googleId,
            });
            return await this.userRepository.save(newUser);
        } catch (error) {
            throw new ConflictException('User with this email already exists',{
                description: 'A user with the provided email already exists in the system.',
            });
        }
    }

}
