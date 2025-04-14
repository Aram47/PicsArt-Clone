import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface UserCreationAttr {
  email: string;
  password: string;
}

@Table({ tableName: 'Users' })
export class User extends Model<User, UserCreationAttr> {
  @ApiProperty({
    example: 1,
    description: 'Unique idetifier',
    required: true,
  })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    example: 'user_47',
    description: 'username',
    required: true,
    format: 'username',
  })
  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  username: string;

  @ApiProperty({
    example: 'user@gmail.com',
    description: 'user email',
    required: true,
    format: 'email',
  })
  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  email: string;

  @ApiProperty({
    example: '123456',
    description: 'user password',
    required: true,
    format: 'password',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;
}
