import { JwtPayload } from './jwt-payload';

export type JwtPayloadWithRefreshToken = JwtPayload & { refreshToken: string };
