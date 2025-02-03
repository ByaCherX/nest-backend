import { HttpException, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { DataSource } from 'typeorm';
import * as bcrypt from 'bcrypt';

//? Entity
import { User } from 'src/db/entity/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,  //? User Service
    private jwtService: JwtService,     //? JWT Service
    private datasource: DataSource,     //? DataBase
  ) {}

  /**
   * 
   */
  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.datasource.getRepository(User).findOne({
      where: { firstname: username },
    });
    console.log('authService')

    async function checkUser(username, password: any) {
      const comp = await bcrypt.compare(password, user.password);
      return comp;
    }
    if (user) {
      const comp = await checkUser(username, pass);
      if (comp === true) {
        const { ...result } = user;
        return result;
      }
      throw new HttpException('password is wrong! (Not Production)',401)
    }
    else { throw new HttpException('user not finded !',401) }
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.userId };
    return { access_token: this.jwtService.sign(payload) };
  }
}
