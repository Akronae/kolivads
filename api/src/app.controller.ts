import { Controller, Request, Post, UseGuards, Get } from '@nestjs/common';
import { Request as Req } from 'express';
import { AppService } from './app.service';
import { JwtAuthGuard } from './modules/auth/jwt-auth.guard';
import { JwtSession, JwtSessionPayload } from './modules/auth/jwt.strategy';
import { LocalAuthGuard } from './modules/auth/local-auth.guard';
import {
  LocalSession,
  LocalSessionPayload,
} from './modules/auth/local.strategy';
import AuthService from './modules/auth/service';
import ClientService from './modules/client/service';

@Controller()
export class AppController {
  constructor(
    private appService: AppService,
    private authService: AuthService,
    private clientService: ClientService,
  ) {}

  @Get('/')
  async hey() {
    return await this.appService.getHello();
  }

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(
    @Request() req: Req,
    @LocalSession() session: LocalSessionPayload,
  ) {
    return await this.authService.signToken(session.id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async me(@Request() req: Req, @JwtSession() session: JwtSessionPayload) {
    const user = await this.clientService.getById(session.id);
    return `You are currently logged in as ${user.email}`;
  }
}
