import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateStatusDto } from './dto/create-status.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
import { Status } from './Schemas/status.model';
@Injectable()
export class StatusService {
  constructor(
    @InjectModel(Status) private readonly statusService: typeof Status,
  ) {}

  async createStatus(createStatusDto: CreateStatusDto) {
    const { name } = createStatusDto;
    await this.findStatusByStatusName(name);

    const status = await this.statusService.create(createStatusDto);

    return status;
  }

  async findAll() {
    const statuses = await this.statusService.findAll({
      include: { all: true },
    });
    return statuses;
  }

  async findStatusById(id: number) {
    const status = await this.statusService.findByPk(id);
    if (!status) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    return status;
  }

  async updateStatusById(id: number, updateStatusDto: UpdateStatusDto) {
    await this.findStatusById(id);

    const status = await this.statusService.update(updateStatusDto, {
      where: { id },
      returning: true,
    });
    return status[1][0];
  }

  async removeStatusByID(id: number) {
    await this.findStatusById(id);
    await this.statusService.destroy({ where: { id } });

    return id;
  }

  async findStatusByStatusName(name: string) {
    const status = await this.statusService.findOne({ where: { name } });
    if (status) {
      throw new HttpException('Already exists', HttpStatus.FORBIDDEN);
    }
    return status;
  }
}
