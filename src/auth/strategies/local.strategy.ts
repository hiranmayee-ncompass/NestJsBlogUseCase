import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { UserService } from '../../users/services/user.service';
import * as crypto from 'crypto';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    try {
      const hashedPassword = crypto
        .createHash('md5')
        .update(password)
        .digest('hex');

      const user = await this.userService.findByUsernameAndPassword(
        username,
        hashedPassword,
      );

      if (!user) {
        throw new UnauthorizedException();
      }

      return user;
    } catch (error) {
      throw new UnauthorizedException();
    }
  }
}
