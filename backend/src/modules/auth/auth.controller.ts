import {
  Controller,
  Post,
  Get,
  Body,
  Req,
  UseGuards,
  Res,
} from '@nestjs/common';
import { AuthService, LoginResponse } from './auth.service';
import { LoginUserDto } from './dtos/login-user.dto';
import { RefreshTokenGuard } from './guards/refresh-token.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(
    @Body() loginUserDto: LoginUserDto,
    @Res() res,
  ): Promise<LoginResponse> {
    try {
      const { accessToken, refreshToken } =
        await this.authService.login(loginUserDto);

      if (!accessToken || !refreshToken) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: false,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        sameSite: 'Strict',
      });

      res.cookie('accessToken', accessToken, {
        httpOnly: true,
        secure: false,
        maxAge: 1 * 24 * 60 * 60 * 1000,
        sameSite: 'Strict',
        path: '/',
      });

      return res.status(200).json({ accessToken });
    } catch (error) {
      return res
        .status(500)
        .json({ message: 'Internal server error', error: error.message });
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('login/confirmation')
  async loginConfirmation(@Req() req) {
    return req.user;
  }

  @UseGuards(RefreshTokenGuard)
  @Post('refresh')
  async refreshTokens(@Req() req, @Res() res) {
    try {
      const userId = req.user.sub;
      const { accessToken } = await this.authService.refreshTokens(
        userId,
        req.user.refreshToken,
      );

      res.cookie('accessToken', accessToken, {
        httpOnly: true,
        secure: false,
        maxAge: 1 * 24 * 60 * 60 * 1000,
        sameSite: 'Strict',
        path: '/',
      });

      return res
        .status(200)
        .json({ message: 'Access token refreshed successfully' });
    } catch (error) {
      return res
        .status(500)
        .json({ message: 'Failed to refresh tokens', error: error.message });
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  async logout(@Req() req, @Res() res) {
    try {
      res.clearCookie('accessToken');
      res.clearCookie('refreshToken');

      return res.status(200).json({ message: 'Logout successful' });
    } catch (error) {
      return res
        .status(500)
        .json({ message: 'Logout failed', error: error.message });
    }
  }
}
