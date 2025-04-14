import { Inject, Injectable, OnModuleInit, UnauthorizedException } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { UsersServiceClient, CreateUserRequest, getUserByUsernameRequest } from './users.interface';
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
		const req: getUserByUsernameRequest = { username: dto.username };

		try {
			const user = await firstValueFrom(this.usersService.getUserByUsernameGrpc(req));

			if (!user) {
				throw new UnauthorizedException('Invalid credentials');
			}

			const isPasswordValid = await this.__comparePasswords(dto.password, user.password);
			if (!isPasswordValid) {
				throw new UnauthorizedException('Invalid credentials');
			}

			const token = await this.__generateToken(user.id, user.username);
			return { token };
		}
		catch (error) {
			throw new UnauthorizedException('Invalid credentials');
		}
	}

	async register(dto: CreateUserDto): Promise<{token: string}>  {
		const req: CreateUserRequest = {
			email: dto.email,
			password: dto.password,
			name: dto.username,
		};

		try {
			const user = await firstValueFrom(this.usersService.createUserGrpc(req));
			const token = await this.__generateToken(user.id, user.username);
			return { token };
		}
		catch (error) {
			throw new Error(`Registration failed: ${error.message}`);
		}
	}

	private async __generateToken(userId: number, username: string): Promise<string> {
		const payload = { sub: userId, username };
		return this.jwtService.signAsync(payload);
	}

	private async __comparePasswords (pass1: string, pass2: string): Promise<boolean> {
		return pass1 === pass2;
	}
}
