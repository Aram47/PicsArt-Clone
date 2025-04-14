import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { UsersServiceClient, CreateUserRequest } from './users.interface';
import { UserDto } from './dto/user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { firstValueFrom } from 'rxjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService implements OnModuleInit {
	private usersService: UsersServiceClient;

	constructor(@Inject('USERS_PACKAGE') private client: ClientGrpc, private jwtService: JwtService) {}

	onModuleInit() {
		this.usersService = this.client.getService<UsersServiceClient>('UserService');
	}

	async login(dto: UserDto) {

	}

	async register(dto: CreateUserDto): Promise<{token: string}>  {
		const req: CreateUserRequest = {
			email: dto.email,
			password: dto.password,
			name: dto.username,
		};

		try {
			const user = await firstValueFrom(this.usersService.createUserGrpc(req));
			const token = await this.generateToken(user.id, user.username);
			return { token };
		}
		catch (error) {
			throw new Error(`Registration failed: ${error.message}`);
		}
	}

	private async generateToken(userId: number, username: string): Promise<string> {
		const payload = { sub: userId, username };
		return this.jwtService.signAsync(payload);
	}
}
