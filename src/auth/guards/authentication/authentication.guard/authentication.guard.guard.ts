import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthType } from 'src/auth/enums/auth-type.enum';
import { AccessTokenGuard } from 'src/auth/guards/access-token/access-token.guard';
import { AUTH_TYPE_KEY } from './../../../constants/auth.constants';

@Injectable()
export class AuthenticationGuardGuard implements CanActivate {
  private static readonly defaultAuthType = AuthType.Bearer;
  private readonly authTypeGuardMap: Record<
    AuthType,
    CanActivate | CanActivate[]
  > = {
    [AuthType.Bearer]: this.accessTokenGuard,
    [AuthType.None]: { canActivate: () => true },
  };
  constructor(
    private readonly reflector: Reflector,
    private readonly accessTokenGuard: AccessTokenGuard,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const authType =
      this.reflector.getAllAndOverride<AuthType | AuthType[]>(AUTH_TYPE_KEY, [
        context.getHandler(),
        context.getClass(),
      ]) ?? AuthenticationGuardGuard.defaultAuthType;

    const authTypesArray = Array.isArray(authType) ? authType : [authType];
    const guards = authTypesArray
      .map((type) => this.authTypeGuardMap[type])
      .flat();
    console.log('guards', guards);
    const error = new UnauthorizedException();
    for (const instance of guards) {
      console.log('instance', instance);
      const canActivate = await Promise.resolve(
        instance.canActivate(context),
      ).catch((err) => {
        error: err;
      });
      console.log('canActivate', canActivate);
      if (canActivate) {
        return true;
      }
    }
   throw error;
  }
}
