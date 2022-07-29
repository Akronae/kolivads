import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import AuthService from '@/modules/auth/service';
import ClientModule from '../client/module';
import { LocalStrategy } from './local.strategy';
import { config } from '@/config';
import { JwtStrategy } from './jwt.strategy';

const JwtModuleImport = JwtModule.register({
  secret: config.jwt_secret,
  signOptions: { expiresIn: '1h' },
});

@Module({
  imports: [ClientModule, PassportModule, JwtModuleImport],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
})
export default class AuthModule {}
