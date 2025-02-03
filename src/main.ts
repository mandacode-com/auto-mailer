import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { ConfigService } from '@nestjs/config';
import { Config } from './schemas/config.schema';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      useFactory: (configService: ConfigService) => {
        const config = configService.get<Config>('config');
        if (!config) {
          throw new Error('Config not found');
        }
        return {
          transport: Transport.GRPC,
          options: {
            package: 'email_verification',
            protoPath: join(__dirname, 'protos/email_verification.proto'),
            url: `localhost:${config.server.port}`,
          },
        };
      },
      inject: [ConfigService],
    },
  );

  await app.listen();
}
bootstrap();
