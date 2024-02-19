import {
  Controller,
  Post,
  UseGuards,
  Get,
  Request,
  Param,
  Body,
  ParseIntPipe,
  Patch,
} from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from 'src/users/services/user.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('/userlogin')
  signIn(@Request() req): any {
    const token = this.authService.login(req.user);
    return token;
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
  @Post('create-superadmin')
  async createSuperAdmin() {
    const result = await this.userService.createSuperAdmin();
    return { message: result };
  }

  @UseGuards(JwtAuthGuard)
  @Patch('changerole/:userId')
  async changeUserRole(
    @Request() req,
    @Param('userId', ParseIntPipe) userId: number,
    @Body('newRoleId', ParseIntPipe) newRoleId: number,
  ) {
    return this.userService.changeUserRole(req, userId, newRoleId);
  }
}
