import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { Request } from 'express';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      jwtFromRequest: (req: Request) => {
        const token = req.cookies['accessToken'];
        return token || null;
      },
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: any) {
    return { name: payload.username };
  }
}
