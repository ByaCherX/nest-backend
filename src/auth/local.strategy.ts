import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

//? User Entity
import { User } from 'src/db/entity/user.entity';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local-auth') {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(username: string, password: string) {
    const user: User = await this.authService.validateUser(username, password);
    if (!user) {  //_ Never throw Error
      throw new UnauthorizedException('local-strategy Exception');
    }
    const _user = { username: user.firstname, userId: user.id };
    return _user;
  }
}
