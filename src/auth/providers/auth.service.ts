import { RefreshTokenDto } from './../dtos/refresh-token.dto';
import { Injectable, forwardRef, Inject } from '@nestjs/common';
import { UsersService } from 'src/users/providers/users.service';
import { SigninDto } from '../dtos/signin.dto';
import { SignInProvider } from './sign-in.provider';
import { RefreshTokensProvider } from './refresh-tokens.provider';

@Injectable()
export class AuthService {
    constructor(
        @Inject(forwardRef(() => UsersService))
        private readonly usersService: UsersService,
        private readonly signInProvider: SignInProvider,
        private readonly refreshTokensProvider: RefreshTokensProvider,
    ) {}

    public async signIn(signinDto: SigninDto) {
        return await this.signInProvider.signIn(signinDto);
    }

    public async refreshTokens(refreshTokenDto: RefreshTokenDto) {
        // Call the refreshTokens method from RefreshTokensProvider
        return await this.refreshTokensProvider.refreshTokens(refreshTokenDto);
    }

   

}
