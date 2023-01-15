import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Gender } from 'src/gender/Schemas/gender.model';

interface HumanCategoryCreationAttrs {
  readonly name: string;
  readonly start_age: number;
  readonly finish_age: number;
  readonly gender: string;
}

@Table({ tableName: 'human_category' })
export class HumanCategory extends Model<
  HumanCategory,
  HumanCategoryCreationAttrs
> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    unique: true,
  })
  name: string;

  @Column({
    type: DataType.INTEGER,
  })
  start_age: number;

  @Column({
    type: DataType.INTEGER,
  })
  finish_age: number;

  @ForeignKey(() => Gender)
  @Column({
    type: DataType.INTEGER,
  })
  gender_id: number;

  @BelongsTo(() => Gender)
  genders: Gender;
}
