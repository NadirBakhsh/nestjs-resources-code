import { GenerateTokensProvider } from './../../providers/generate-tokens.provider';
import { ConflictException, forwardRef, Inject, Injectable, OnModuleInit, UnauthorizedException } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { OAuth2Client } from 'google-auth-library';
import jwtConfig from 'src/auth/config/jwt.config';
import { GoogleTokenDto } from '../dtos/google-token.dto';
import { UsersService } from 'src/users/providers/users.service';

@Injectable()
export class GoogleAuthenticationService implements OnModuleInit {
  private oauthClient: OAuth2Client;
  constructor(

    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,

    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,

    private readonly generateTokensProvider: GenerateTokensProvider,
  ) {}
    onModuleInit() {
      const clientId = this.jwtConfiguration.googleClientId;
      const clientSecret = this.jwtConfiguration.googleClientSecret;
      this.oauthClient = new OAuth2Client(clientId, clientSecret);
    }

    public async authentication(googleTokenDto: GoogleTokenDto) {
      // verify the google token sent by the client
      try {
      const loginTicket = await this.oauthClient.verifyIdToken({
        idToken: googleTokenDto.token,
      });

      const {
        email,
        sub: googleId,
        given_name: firstName,
        family_name: lastName
      } = loginTicket.getPayload();
      // extract the payload for the jwt
      //  find the user in the database using the googleId
      const user = await this.usersService.findOneByGoogleId(googleId);
      //  if googleId exists generate token
      if(user) {
        return this.generateTokensProvider.generateAccessToken(user);
      }
      //  if not create a new user and then generate tokens
      const newUser = await this.usersService.createGoogleUser({
        email,
        firstName,
        lastName,
        googleId,
      });
      return this.generateTokensProvider.generateAccessToken(newUser);
      //  throw unauthorized exception

    } catch (error) {
      throw new UnauthorizedException(error);
    }
}
}