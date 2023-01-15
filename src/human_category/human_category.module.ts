import { Module } from '@nestjs/common';
import { HumanCategoryService } from './human_category.service';
import { HumanCategoryController } from './human_category.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { HumanCategory } from './Schemas/human_category.model';
import { Gender } from 'src/gender/Schemas/gender.model';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [SequelizeModule.forFeature([HumanCategory, Gender]), JwtModule],
  controllers: [HumanCategoryController],
  providers: [HumanCategoryService],
})
export class HumanCategoryModule {}
