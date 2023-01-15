import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class CustomerGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    try {
      const req = context.switchToHttp().getRequest();
      const authHeader = req.headers.authorization;

      const bearer = authHeader.split(' ')[0];
      const token = authHeader.split(' ')[1];

      if (bearer !== 'Bearer' || !token) {
        throw new UnauthorizedException({
          message: 'User is not authorized',
        });
      }

      const customer = this.jwtService.verify(token, {
        publicKey: process.env.ACCESS_TOKEN_KEY,
      });

      if (req.body.id !== String(customer.sub)) {
        return false;
      }

      return true;
    } catch (error) {
      throw new UnauthorizedException({ message: 'User unauthorized' });
    }
  }
}
