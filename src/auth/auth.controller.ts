import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './providers/auth.service';
import { SigninDto } from './dtos/signin.dto';
import { Auth } from './decorators/auth.decorator';
import { AuthType } from './enums/auth-type.enum';
import { RefreshTokenDto } from './dtos/refresh-token.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('sign-in')
    @Auth(AuthType.None)
    public async signin(@Body() signinDto: SigninDto) {
        return await this.authService.signIn(signinDto);
    }

    @Post('refresh-tokens')
    @Auth(AuthType.None)
    public async refreshTokens(@Body() refreshTokenDto: RefreshTokenDto) {
        return await this.authService.refreshTokens(refreshTokenDto);
    }
}
