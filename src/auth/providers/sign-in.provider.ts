import { HashingProvider } from 'src/auth/providers/hashing.provider';
import { UsersService } from 'src/users/providers/users.service';
import { forwardRef, Inject, Injectable, RequestTimeoutException, UnauthorizedException } from '@nestjs/common';
import { SigninDto } from '../dtos/signin.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigType } from '@nestjs/config';
import jwtConfig from '../config/jwt.config';
import { ActiveUserData } from '../interfaces/active-user.interface';
import { GenerateTokensProvider } from './generate-tokens.provider';

@Injectable()
export class SignInProvider {
    constructor(
        @Inject(forwardRef(() => UsersService))
        private readonly usersService: UsersService,
        
        // inject hashing provider
        private readonly hashingProvider: HashingProvider,
        
        private readonly generateTokensProvider: GenerateTokensProvider,

    ) {}

    public async signIn(signinDto: SigninDto) {
        // Step 1 & 2: Find user by email, throws if not found
        const user: any = await this.usersService.findOneByEmail(signinDto.email);
        // Step 3: Compare password to hash
        let isEqual = false;
        try {
            isEqual = await this.hashingProvider.comparePassword(
                signinDto.password,
                user.password
            );
        } catch (error) {
            throw new RequestTimeoutException(error, {
                description: 'Could not compare passwords',
            });
        }

        // Step 4: If password does not match, throw Unauthorized
        if (!isEqual) {
            throw new UnauthorizedException('Incorrect password');
        }

      return await this.generateTokensProvider.generateAccessToken(user);
    }
}
