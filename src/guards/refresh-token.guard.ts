import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class RefreshTokenGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();

    const { refresh_token } = req.cookies;

    if (!refresh_token) {
      throw new UnauthorizedException({
        message: 'User is not authorized',
      });
    }

    const customer = this.jwtService.verify(refresh_token, {
      publicKey: process.env.REFRESH_TOKEN_KEY,
    });

    return true;
  }
}
