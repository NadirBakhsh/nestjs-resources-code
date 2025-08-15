import { Injectable, forwardRef, Inject } from '@nestjs/common';
import { UsersService } from 'src/users/providers/users.service';
import { SigninDto } from '../dtos/signin.dto';

@Injectable()
export class AuthService {
    constructor(
        @Inject(forwardRef(() => UsersService))
        private readonly usersService: UsersService
    ) {}
    public signIn(signinDto: SigninDto) {
        const user = this.usersService.findOneById(signinDto.email);
        return "TOKEN_EXAMPLE"
    }

    public isAuth() {
       return true 
    }

}
