import {
  Controller,
  Get,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Res,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCookieAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Request, Response } from 'express';
import { CreatorAdminGuard } from 'src/guards/admin-creator.guard';
import { LogoutGuard } from 'src/guards/logout.guard';
import { RefreshTokenGuard } from 'src/guards/refresh-token.guard';
import { AdminService } from './admin.service';
import { ActivateDto } from './dto';
import { AuthDto } from './dto/signin.dto';
import { CreateAdminDto } from './dto/signup.dto';
import { Admin } from './Schemas/admin.model';

@ApiTags('Admin')
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @ApiOperation({ summary: 'signup admin' })
  @ApiResponse({ status: 200, type: [Admin] })
  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  async signup(
    @Body() createAdminDto: CreateAdminDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.adminService.signup(createAdminDto, res);
  }

  @ApiOperation({ summary: 'signin admin' })
  @ApiResponse({ status: 200, type: [Admin] })
  @Post('signin')
  @HttpCode(HttpStatus.OK)
  async signin(
    @Body() authDto: AuthDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.adminService.signIn(authDto, res);
  }

  @ApiOperation({ summary: 'logout admin' })
  @ApiResponse({ status: 200, type: [Admin] })
  @ApiCookieAuth()
  @UseGuards(LogoutGuard)
  @Post('logout')
  @HttpCode(HttpStatus.OK)
  async logout(@Res({ passthrough: true }) res: Response, @Req() req: Request) {
    return this.adminService.logout(req, res);
  }

  @ApiOperation({ summary: 'get token' })
  @ApiResponse({ status: 200, type: [Admin] })
  @ApiCookieAuth()
  @UseGuards(RefreshTokenGuard)
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  async refreshTokens(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.adminService.refreshTokens(req, res);
  }

  @ApiOperation({ summary: 'activate admin' })
  @ApiResponse({ status: 200, type: [Admin] })
  @ApiBearerAuth()
  @UseGuards(CreatorAdminGuard)
  @Post('activate')
  @HttpCode(HttpStatus.OK)
  async activate(
    @Body() activateDto: ActivateDto,
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.adminService.activate(activateDto, req, res);
  }

  @ApiOperation({ summary: 'get admins' })
  @ApiResponse({ status: 200, type: [Admin] })
  @ApiBearerAuth()
  @UseGuards(CreatorAdminGuard)
  @Get('all')
  @HttpCode(HttpStatus.OK)
  getAll() {
    return this.adminService.getAllAdmins();
  }

  @ApiOperation({ summary: 'delete admin' })
  @ApiResponse({ status: 200, type: [Admin] })
  @ApiBearerAuth()
  @UseGuards(CreatorAdminGuard)
  @Post('delete')
  @HttpCode(HttpStatus.OK)
  async delete(
    @Body('id') id: string,
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.adminService.deleteAdmin(+id, req, res);
  }
}
