import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { OAuth2Client } from 'google-auth-library';
import jwtConfig from 'src/auth/config/jwt.config';
import { GoogleTokenDto } from '../dtos/google-token.dto';

@Injectable()
export class GoogleAuthenticationService implements OnModuleInit {
  private oauthClient: OAuth2Client;
  constructor(
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
  ) {}
    onModuleInit() {
      const clientId = this.jwtConfiguration.googleClientId;
      const clientSecret = this.jwtConfiguration.googleClientSecret;
      this.oauthClient = new OAuth2Client(clientId, clientSecret);
    }

    public async authentication(googleTokenDto: GoogleTokenDto) {
      // verify the google token sent by the client
      // extract the payload for the jwt
      //  find the user in the database using the googleId
      //  if googleId exists generate token
      //  if not create a new user and then generate tokens
      //  throw unauthorized exception

    }
}
