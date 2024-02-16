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

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @UseGuards(AuthGuard('local'))
  @Post('/userlogin')
  signIn(@Request() req): any {
    const token = this.authService.signIn(req.user);
    return token;
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
  @Post('create-superadmin')
  async createSuperAdmin() {
    const result = await this.userService.createSuperAdmin();
    return { message: result };
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch('changerole/:userId')
  async changeUserRole(
    @Request() req,
    @Param('userId', ParseIntPipe) userId: number,
    @Body('newRoleId', ParseIntPipe) newRoleId: number,
  ) {
    return this.userService.changeUserRole(req.user.id, userId, newRoleId);
  }
}
