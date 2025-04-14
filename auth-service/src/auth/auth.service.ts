import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { UserService } from '../../../users-service/src/user/user.service';

@Injectable()
export class AuthService implements OnModuleInit {
	private usersService: UserService;

	constructor(@Inject('USERS_PACKAGE') private client: ClientGrpc) {}

	onModuleInit() {
		this.usersService = this.client.getService<UserService>('UserService');
	}
}
