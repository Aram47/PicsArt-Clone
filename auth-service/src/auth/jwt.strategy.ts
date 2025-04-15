import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.PRIVATE_KEY || 'MQTP', // Must match the key above
    });
  }

  async validate(payload: any) {
    // Return user data from the token payload
    return { userId: payload.sub, username: payload.username };
  }
}
