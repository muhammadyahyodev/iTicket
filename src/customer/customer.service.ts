import {
  BadRequestException,
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { Customer } from './Schemas/customer.model';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';
import { LoginDto } from './dto/login.dto';
import { UpdateCustomerDto } from './dto';

@Injectable()
export class CustomerService {
  constructor(
    @InjectModel(Customer) private readonly customerRepository: typeof Customer,
    private readonly jwtService: JwtService,
  ) {}

  async signup(createCustomerDto: CreateCustomerDto, res: Response) {
    const { email, password } = createCustomerDto;
    const check = await this.findCustomerByEmail(email);

    if (check) {
      throw new HttpException('Aleady exists', HttpStatus.FORBIDDEN);
    }

    const hashedPassword = await bcrypt.hash(password, 7);

    const customer = await this.customerRepository.create({
      ...createCustomerDto,
      password: hashedPassword,
    });

    const tokens = await this.getTokens(customer.id, customer.email);
    await this.updateRefreshTokenHash(customer.id, tokens.refresh_token);

    res.cookie('refresh_token', tokens.refresh_token, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    return tokens;
  }

  async signin(loginDto: LoginDto, res: Response) {
    const customer = await this.customerRepository.findOne({
      where: { email: loginDto.email },
    });

    if (!customer) {
      throw new BadRequestException('Customer not registered');
    }

    const passwordMatches = await bcrypt.compare(
      loginDto.password,
      customer.password,
    );

    if (!passwordMatches) {
      throw new ForbiddenException('Access denaid');
    }

    const { id, email } = customer;
    const tokens = await this.getTokens(id, email);

    await this.updateRefreshTokenHash(customer.id, tokens.refresh_token);

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
        throw new HttpException('Customer unauthorized', HttpStatus.NOT_FOUND);
      }

      const check = await this.jwtService.verify(token, {
        publicKey: process.env.REFRESH_TOKEN_KEY,
      });

      const customer = await this.customerRepository.update(
        { refresh_token: null },
        {
          where: { id: check.sub },
          returning: true,
        },
      );

      if (!customer[1][0])
        throw new HttpException(
          { reason: 'You must login' },
          HttpStatus.FORBIDDEN,
        );

      res.clearCookie('refresh_token');

      return true;
    } catch (error) {
      throw new UnauthorizedException('Customer unauthorized');
    }
  }

  async refreshTokens(customerId: number, req: Request, res: Response) {
    const { refresh_token } = req.cookies;

    const customer = await this.customerRepository.findByPk(customerId);

    if (!customer || !customer.refresh_token) {
      throw new ForbiddenException('Access denied');
    }

    const rtMatches = await bcrypt.compare(
      refresh_token,
      customer.refresh_token,
    );

    if (!rtMatches) {
      throw new ForbiddenException('Access denaid');
    }

    const { email, id } = customer;
    const tokens = await this.getTokens(id, email);

    await this.updateRefreshTokenHash(id, tokens.refresh_token);
    res.cookie('refresh_token', tokens.refresh_token, {
      maxAge: 7 * 24 * 60 * 1000,
      httpOnly: true,
    });

    return tokens;
  }

  async findAll() {
    const customers = await this.customerRepository.findAll();
    return customers;
  }

  async findCustomerById(id: number) {
    const customer = await this.customerRepository.findByPk(id);
    if (!customer) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    return customer;
  }

  async updateCustomerById(id: number, updateCustomerDto: UpdateCustomerDto) {
    await this.findCustomerById(id);

    const customer = await this.customerRepository.update(
      {
        ...updateCustomerDto,
      },
      {
        where: { id },
        returning: true,
      },
    );

    return customer[1][0];
  }

  async removeCustomerById(id: number) {
    await this.findCustomerById(id);
    await this.customerRepository.destroy({ where: { id } });

    return id;
  }

  private async findCustomerByEmail(email: string) {
    const customer = await this.customerRepository.findOne({
      where: { email },
    });

    return customer;
  }

  private async getTokens(admin_id: number, email: string) {
    const jwtPayload = {
      sub: admin_id,
      email: email,
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

  private async updateRefreshTokenHash(
    customerId: number,
    refreshToken: string,
  ) {
    console.log(customerId, refreshToken);
    const hashedRefreshToken = await bcrypt.hash(refreshToken, 7);

    await this.customerRepository.update(
      { refresh_token: hashedRefreshToken },
      { where: { id: customerId }, returning: true },
    );
  }
}
