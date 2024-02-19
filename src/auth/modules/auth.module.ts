import { Module } from '@nestjs/common';
// import { PassportModule } from '@nestjs/passport';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from '../strategies/local.strategy';
import { UserModule } from 'src/users/modules/user.module';
import { AuthService } from '../services/auth.service';
import { AuthController } from '../auth.controller';
import { JwtStrategy } from '../strategies/jwt.strategy';

@Module({
  imports: [
    UserModule, PassportModule,
    // PassportModule.register({ defaultStrategy: 'local' }),

    JwtModule.register({
      secret: 'hmkey',
      signOptions: { expiresIn: '10h' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService, PassportModule],
})
export class AuthModule {}
