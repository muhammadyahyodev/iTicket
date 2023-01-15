import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class LogoutGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    try {
      const req = context.switchToHttp().getRequest();

      const token = req.cookies.refresh_token;

      if (!token) {
        throw new UnauthorizedException({
          message: 'User is not authorized',
        });
      }

      const user = this.jwtService.verify(token, {
        publicKey: process.env.REFRESH_TOKEN_KEY,
      });

      return true;
    } catch (error) {
      throw new UnauthorizedException({ message: 'User unauthorized' });
    }
  }
}
