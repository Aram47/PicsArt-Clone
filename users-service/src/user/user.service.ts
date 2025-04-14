import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.model';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User) private userRepository: typeof User) {}

  async getUsers(): Promise<User[]> {
    const users: User[] = await this.userRepository.findAll({
      include: { all: true },
    });
    if (!users.length) {
      throw new HttpException('users data is empty', HttpStatus.BAD_REQUEST);
    }
    return users;
  }

  async getUserById(id: number): Promise<User> {
    const user: User = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new HttpException('user not found', HttpStatus.BAD_REQUEST);
    }
    return user;
  }

  async createUser(dto: CreateUserDto): Promise<User> {
    const user: User = await this.userRepository.create(dto);
    return user;
  }

  async deleteUser(id: number): Promise<number> {
    const userId = await this.userRepository.destroy({ where: { id } });
    return userId;
  }
}
