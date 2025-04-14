import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GrpcMethod } from '@nestjs/microservices';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.model';

interface CreateUserRequest {
  username: string;
  email: string;
  password: string;
}

interface GetUserRequest {
  id: number;
}

interface getUserByUsernameRequest {
  username: string;
}

interface GrpcUser {
  username: string;
  email: string;
  password: string;
}

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'get all users' })
  @ApiResponse({ status: 200, type: [User] })
  @Get('/')
  getUsers(): Promise<User[]> {
    return this.userService.getUsers();
  }

  @ApiOperation({ summary: 'get user by id' })
  @ApiResponse({ status: 200, type: User })
  @Get(':id')
  getUserById(@Param('id') id: number): Promise<User> {
    return this.__getUser(id);
  }

  @ApiOperation({ summary: 'get user by username' })
  @ApiResponse({ status: 200, type: User })
  @Get(':username')
  getUserByUsername(@Param('username') username: string): Promise<User> {
    return this.__getUserByUsername(username);
  }

  @ApiOperation({ summary: 'create user' })
  @ApiResponse({ status: 200 })
  @Post('/')
  createUser(@Body() dto: CreateUserDto): Promise<User> {
    return this.__createUser(dto);
  }

  @ApiOperation({ summary: 'delete user by id' })
  @ApiResponse({ status: 200 })
  @Delete(':id')
  deleteUser(@Param('id') id: number): Promise<number> {
    return this.userService.deleteUser(id);
  }

  @GrpcMethod('UsersService', 'CreateUser')
  async createUserGrpc(data: CreateUserRequest): Promise<GrpcUser> {
    const user: User = await this.__createUser(data);
    return {
      username: user.username,
      email: user.email,
      password: user.password,
    };
  }

  @GrpcMethod('UsersService', 'GetUser')
  async getUserGrpc(data: GetUserRequest): Promise<GrpcUser> {
    const user: User = await this.__getUser(data.id);
    return {
      username: user.username,
      email: user.email,
      password: user.password,
    };
  }

  @GrpcMethod('UsersService', 'getUserByUsername')
  async getUserGrpcByUsername(data: getUserByUsernameRequest): Promise<GrpcUser> {
    const user: User = await this.__getUserByUsername(data.username);
    return {
      username: user.username,
      email: user.email,
      password: user.password,
    };
  }

  private async __createUser(dto: CreateUserDto): Promise<User> {
    return this.userService.createUser(dto);
  }

  private async __getUser(id: number): Promise<User> {
    return this.userService.getUserById(id);
  }

  private async __getUserByUsername(username: string): Promise<User> {
    return this.userService.getUserByUsername(username);
  }
}
