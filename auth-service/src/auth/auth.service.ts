import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { UserService } from '../../../users-service/src/user/user.service';
import { UserDto } from './dto/user.dto';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class AuthService implements OnModuleInit {
	private usersService: UserService;

	constructor(@Inject('USERS_PACKAGE') private client: ClientGrpc) {}

	onModuleInit() {
		this.usersService = this.client.getService<UserService>('UserService');
	}

	async login(dto: UserDto) {
		
	}

	async register(dto: CreateUserDto) {

	}
}
