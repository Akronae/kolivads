import { Client } from '@/entities/Client';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ClientMongooseModel } from '../client/model';
import ClientService from '../client/service';
import { JwtSessionPayload } from './jwt.strategy';

export enum ValidationError {
  Success,
  NotFound,
  BadCredentials,
}

@Injectable()
export default class AuthService {
  constructor(
    private clientService: ClientService,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    email: string,
    password: string,
  ): Promise<ValidationError | Client> {
    let user = (await this.clientService.get({ email }))?.[0];
    user = ClientMongooseModel.hydrate(user);

    // TODO: use actual user password
    if (user && password === user.id.toString()) {
      return user;
    }
    if (!user) {
      return ValidationError.NotFound;
    }
    return ValidationError.BadCredentials;
  }

  async signToken(userId: number) {
    const payload = new JwtSessionPayload(userId);
    return {
      token: this.jwtService.sign(JSON.parse(JSON.stringify(payload))),
    };
  }
}
