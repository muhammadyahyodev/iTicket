import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface LanguageCretionAttrs {
  readonly language: string;
}

@Table({ tableName: 'language' })
export class Language extends Model<Language, LanguageCretionAttrs> {
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
  language: string;
}
