import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AuthService } from './auth.service';
import { join } from 'path';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'USERS_PACKAGE',
        transport: Transport.GRPC,
        options: {
          package: 'users',
          protoPath: join(__dirname, '../..', 'src/grpcProto/users.proto'),
          url: 'localhost:4789', // Users service gRPC address
        },
      },
    ]),
    JwtModule.register({
      secret: process.env.PRIVATE_KEY || 'MQTP',
      signOptions: { expiresIn: '100000000m' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
