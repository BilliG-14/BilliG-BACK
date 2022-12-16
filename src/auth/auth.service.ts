/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { RegisterUserDTO } from './dto/registerUser.dto';

import { UserService } from 'src/user/user.service';
import { TokenPayload } from './auth.interface';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.getUserByEmail(email);
    const isPasswordMatching = await bcrypt.compare(password, user.password);

    if (isPasswordMatching) {
      const { password, ...result } = user.toObject();
      return result;
    }
    return null;
  }

  public createToken(payload: TokenPayload) {
    const expireAccess = process.env.JWT_EXPIRATION_TIME_ACCESS ?? '2h';
    const expireRefresh = process.env.JWT_EXPIRATION_TIME_REFRESH ?? '14d';
    const access = this.jwtService.sign(payload, {
      expiresIn: expireAccess,
    });
    const refresh = this.jwtService.sign(payload, {
      expiresIn: expireRefresh,
    });

    return {
      access,
      refresh,
    };
  }

  public async creatUserHashed(userInfo: RegisterUserDTO) {
    const passwordHashed = await bcrypt.hash(userInfo.password, 10);
    const userInfoHashed = {
      ...userInfo,
      password: passwordHashed,
    };

    const user = await this.userService.create(userInfoHashed);
    const { password, ...result } = user.toObject();
    return result;
  }
}
