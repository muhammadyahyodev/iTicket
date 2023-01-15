import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Gender } from 'src/gender/Schemas/gender.model';
import { Language } from 'src/language/Schemas/language.model';

interface CustomerCretionAttrs {
  first_name: string;
  last_name: string;
  phone: string;
  password: string;
  email: string;
}

@Table({ tableName: 'customer' })
export class Customer extends Model<Customer, CustomerCretionAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  first_name: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  last_name: string;

  @Column({
    type: DataType.STRING,
  })
  phone: string;

  @Column({
    type: DataType.STRING,
  })
  password: string;

  @Column({
    type: DataType.STRING,
  })
  email: string;

  @Column({
    type: DataType.STRING,
  })
  birth_date: string;

  @ForeignKey(() => Gender)
  @Column({
    type: DataType.STRING,
  })
  gender_id: string;

  @BelongsTo(() => Gender)
  genders: Gender;

  @ForeignKey(() => Language)
  @Column({
    type: DataType.INTEGER,
  })
  lang_id: number;

  @BelongsTo(() => Language)
  languages: Language;

  @Column({
    type: DataType.STRING,
  })
  refresh_token: string;
}
