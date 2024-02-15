import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/users/services/user.service';
import { LoginUserDto } from '../dto/user-login.dto';
import { Dependencies, UnauthorizedException } from '@nestjs/common';

@Dependencies(UserService, JwtService)
@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(loginUserDto: LoginUserDto) {
    const user = await this.userService.findOne(loginUserDto.username);
    if (user?.password !== loginUserDto.password) {
      throw new UnauthorizedException();
    }
    const payload = {
      username: user.username,
      id: user.userid,
      role: user.roleid,
    };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
