import { Injectable, forwardRef, Inject } from '@nestjs/common';
import { UsersService } from 'src/users/providers/users.service';
import { SigninDto } from '../dtos/signin.dto';
import { SignInProvider } from './sign-in.provider';

@Injectable()
export class AuthService {
    constructor(
        @Inject(forwardRef(() => UsersService))
        private readonly usersService: UsersService,
        private readonly signInProvider: SignInProvider,
    ) {}

    public async signIn(signinDto: SigninDto) {
        return await this.signInProvider.signIn(signinDto);
    }

    public isAuth() {
       return true 
    }

}
