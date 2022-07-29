import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import {
  createParamDecorator,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { config } from '@/config';

export class JwtSessionPayload {
  constructor(
    public id: number,
    public iat: number = undefined,
    public exp: number = undefined,
  ) {}
}

export const JwtSession = createParamDecorator<JwtSessionPayload>(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.jwt_secret,
    });
  }

  async validate(payload: JwtSessionPayload): Promise<JwtSessionPayload> {
    return payload;
  }
}
