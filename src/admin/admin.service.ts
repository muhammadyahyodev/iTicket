import {
  BadRequestException,
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Request, Response } from 'express';
import { ActivateDto, AuthDto, CreateAdminDto } from './dto';
import { Admin } from './Schemas/admin.model';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(Admin) private readonly adminRepository: typeof Admin,
    private readonly jwtService: JwtService,
  ) {}

  async signup(createAdminDto: CreateAdminDto, res: Response) {
    const { email, password } = createAdminDto;
    await this.findAdminByEmail(email);

    const hashedPassword = await bcrypt.hash(password, 7);

    const admin = await this.adminRepository.create({
      ...createAdminDto,
      password: hashedPassword,
    });

    const tokens = await this.getTokens(
      admin.id,
      admin.email,
      admin.is_active,
      admin.is_creator,
    );

    await this.updateRefreshTokenHash(admin.id, tokens.refresh_token);

    res.cookie('refresh_token', tokens.refresh_token, {
      maxAge: 7 * 24 * 60 * 1000,
      httpOnly: true,
    });

    return tokens;
  }

  async signIn(authDto: AuthDto, res: Response) {
    const admin = await this.adminRepository.findOne({
      where: { email: authDto.email },
    });

    if (!admin) {
      throw new BadRequestException('Admin not registered');
    }

    const passwordMatches = await bcrypt.compare(
      authDto.password,
      admin.password,
    );

    if (!passwordMatches) {
      throw new ForbiddenException('Access denaid');
    }

    const { id, email, is_active, is_creator } = admin;
    const tokens = await this.getTokens(id, email, is_active, is_creator);

    await this.updateRefreshTokenHash(admin.id, tokens.refresh_token);

    res.cookie('refresh_token', tokens.refresh_token, {
      maxAge: 7 * 24 * 60 * 1000,
      httpOnly: true,
    });

    return tokens;
  }

  async logout(req: Request, res: Response) {
    try {
      const token = req.cookies.refresh_token;

      if (!token) {
        throw new HttpException('Admin unauthorized', HttpStatus.NOT_FOUND);
      }

      const check = await this.jwtService.verify(token, {
        publicKey: process.env.REFRESH_TOKEN_KEY,
      });

      const admin = await this.adminRepository.update(
        { refresh_token: null },
        {
          where: { id: check.sub },
          returning: true,
        },
      );

      if (!admin[1][0])
        throw new HttpException(
          { reason: 'You must login' },
          HttpStatus.FORBIDDEN,
        );

      res.clearCookie('refresh_token');

      return true;
    } catch (error) {
      throw new UnauthorizedException('Admin unauthorized');
    }
  }

  async deleteAdmin(id: number, req: Request, res: Response) {
    await this.findAdminById(id);
    await this.adminRepository.destroy({ where: { id } });

    return id;
  }

  async refreshTokens(req: Request, res: Response) {
    const { refresh_token } = req.cookies;

    const check = await this.jwtService.verify(refresh_token, {
      publicKey: process.env.REFRESH_TOKEN_KEY,
    });

    const admin = await this.adminRepository.findByPk(check.sub);

    if (!admin) {
      throw new ForbiddenException('Not found');
    }

    const { email, id, is_active, is_creator } = admin;

    const tokens = await this.getTokens(id, email, is_active, is_creator);

    await this.updateRefreshTokenHash(id, tokens.refresh_token);

    res.cookie('refresh_token', tokens.refresh_token, {
      maxAge: 7 * 24 * 60 * 1000,
      httpOnly: true,
    });

    return tokens;
  }

  async getAllAdmins() {
    const admins = await this.adminRepository.findAll({
      include: { all: true },
    });
    return admins;
  }

  async activate(activateDto: ActivateDto, req: Request, res: Response) {
    const { id, value } = activateDto;
    const admin = await this.findAdminById(+id);

    if (!admin) {
      throw new NotFoundException('Not found');
    }

    const token = req.cookies.refresh_token;

    const creator = await this.jwtService.verify(token, {
      publicKey: process.env.REFRESH_TOKEN_KEY,
    });

    if (!creator) {
      throw new UnauthorizedException('Condidate unauthorized');
    }

    const activatedAdmin = await this.adminRepository.update(
      { is_active: value },
      { where: { id: +admin.id, is_active: !value }, returning: true },
    );

    if (!activatedAdmin[1][0]) {
      throw new HttpException(
        'Already activated or deactivated',
        HttpStatus.FORBIDDEN,
      );
    }
    return activatedAdmin[1][0];
  }

  private async findAdminById(id: number) {
    const admin = await this.adminRepository.findByPk(id);

    if (admin === null) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    return admin;
  }

  private async findAdminByEmail(email: string) {
    const admin = await this.adminRepository.findOne({ where: { email } });

    if (admin) {
      throw new BadRequestException('Already exists');
    }

    return admin;
  }

  private async getTokens(
    admin_id: number,
    email: string,
    is_active: boolean,
    is_creator: boolean,
  ) {
    const jwtPayload = {
      sub: admin_id,
      email: email,
      is_active,
      is_creator,
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(jwtPayload, {
        secret: process.env.ACCESS_TOKEN_KEY,
        expiresIn: process.env.ACCESS_TOKEN_TIME,
      }),
      this.jwtService.signAsync(jwtPayload, {
        secret: process.env.REFRESH_TOKEN_KEY,
        expiresIn: process.env.REFRESH_TOKEN_TIME,
      }),
    ]);

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }

  async updateRefreshTokenHash(id: number, refreshToken: string) {
    const hashedRefreshToken = await bcrypt.hash(refreshToken, 7);

    await this.adminRepository.update(
      { refresh_token: hashedRefreshToken },
      { where: { id } },
    );
  }
}
