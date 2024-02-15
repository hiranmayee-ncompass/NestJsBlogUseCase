import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from '../strategies/local.strategy';
import { UserModule } from 'src/users/modules/user.module';
import { AuthService } from '../services/auth.service';
import { AuthController } from '../auth.controller';

@Module({
  imports: [
    UserModule,
    PassportModule.register({ defaultStrategy: 'local' }),

    JwtModule.register({
      secret: 'hmkey',
      signOptions: { expiresIn: '10h' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy],
  exports: [AuthService, PassportModule],
})
export class AuthModule {}
