import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import {
  createParamDecorator,
  ExecutionContext,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import AuthService, { ValidationError } from '@/modules/auth/service';
import { Client } from '@/entities/Client';

export class LocalSessionPayload extends Client {}

export const LocalSession = createParamDecorator<LocalSessionPayload>(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'email' });
  }

  async validate(
    email: string,
    password: string,
  ): Promise<LocalSessionPayload> {
    const user = await this.authService.validateUser(email, password);
    if (user === ValidationError.NotFound) {
      throw new NotFoundException();
    }
    if (user === ValidationError.BadCredentials) {
      throw new UnauthorizedException();
    }
    return user as LocalSessionPayload;
  }
}
