import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { TokenPayload } from '../auth.interface';
import { UserService } from 'src/user/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRETKEY ?? 'secretkey',
    });
  }

  async validate(payload: TokenPayload) {
    const user = await this.userService.getUserById(payload.id);
    if (user.suspension) {
      throw new HttpException('이용 정지된 유저 입니다', 499);
    }
    return user;
  }
}
