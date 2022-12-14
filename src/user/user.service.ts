import { Injectable } from '@nestjs/common';
import { CreateUserDTO } from './dto/createUser.dto';

@Injectable()
export class UserService {
  get() {
    return;
  }

  create(userInfo: CreateUserDTO) {
    return userInfo;
  }
}
