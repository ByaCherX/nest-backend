import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';

//? Controller
import { AuthController } from './auth.controller';
//? Modules
import { UsersModule } from 'src/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

/** --- Authentication ---
 * 
 ** Auth-login Schema
 * -> @decorator  LocalAuthGuard
 * -> @class LocalStrategy
 *   => super()
 *   => validate(username, password)
 *     > User = authService.validateUser(username, password).call()
 * -> @class AuthService
 *   => fetch-db(user)
 *   => checkUser(password)
 *   => return User
 * -> LocalStrategy
 *   => return {username, userId}
 * -> @class AuthController
 *   => authService.login(req.user)
 * -> @class AuthService
 *   => payload = {username, sub}
 *   => access_token = jwtService.sign(payload)
 *   => return {access_token}
 * 
 ** Auth-jwt Schema
 * -> @decorator JwtAuthGuard
 *   => canActivate() > super.canActivate(context)
 * -> @class JwtStrategy
 *   => validate(payload)
 *   => return {userId, username}
 * -> @decorator JwtAuthGuard
 *   => handleRequest(err,user,info)
 *   => return user
 * -> @class AuthController
 *   => return req.user
 *
 */
@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: Buffer.from(process.env.JWT_SECRET),
      signOptions: { expiresIn: '1h', algorithm:"HS256", issuer: "nest" },
      verifyOptions: { issuer: "nest" }
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
})
export class AuthModule {
  constructor() {}
}