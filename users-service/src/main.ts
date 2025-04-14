import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import * as path from 'path';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function main() {
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.GRPC,
    options: {
      url: 'localhost:4789',
      protoPath: path.join(__dirname, '..', 'src/grpcProto/users.proto'),
      package: 'users',
    },
  });

  // app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('Users-Service Doc')
    .setVersion('1.0')
    .addTag('api')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.startAllMicroservices();
  await app.listen(process.env.PORT, () => {
    console.log(`Users-Service listening on PORT: ${process.env.PORT}`);
  });
}

main();
