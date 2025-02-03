import { Controller, UseGuards, Post, Req, Get, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { Roles, Role } from './role.decorator';
import { Request, Response } from 'express';
import { RolesGuard } from './role.guard';


@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() req: Request) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Req() req: Request) {
    return req.user;
  }

  @Role(Roles.User)
  @Get('role')
  roleA(@Res() res: Response) {
    res.sendStatus(200);
  }
}
