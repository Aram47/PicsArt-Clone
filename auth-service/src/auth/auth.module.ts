import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AuthService } from './auth.service';
import { join } from 'path';
import { JwtModule } from '@nestjs/jwt'

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'USERS_PACKAGE',
        transport: Transport.GRPC,
        options: {
          package: 'users',
          protoPath: join(__dirname, '..', '/grpcProto/users.proto')
        }
      }
    ]),
    JwtModule.register({
      secret: process.env.PRIVATE_KEY, // Replace with a secure key
      signOptions: { expiresIn: '60m' }, // Token expires in 1 hour
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
