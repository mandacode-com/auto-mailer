import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AsyncMicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { ConfigService } from '@nestjs/config';
import { Config } from './schemas/config.schema';
import { GRPC_HEALTH_V1_PACKAGE_NAME } from './protos/health';
import { MAILER_PACKAGE_NAME } from './protos/mailer';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<AsyncMicroserviceOptions>(
    AppModule,
    {
      useFactory: (configService: ConfigService<Config, true>) => {
        const serverConfig = configService.get<Config['server']>('server');
        if (!serverConfig) {
          throw new Error('Config not found');
        }
        return {
          transport: Transport.GRPC,
          options: {
            package: [MAILER_PACKAGE_NAME, GRPC_HEALTH_V1_PACKAGE_NAME],
            protoPath: [
              join(__dirname, 'protos/health.proto'),
              join(__dirname, 'protos/mailer.proto'),
            ],
            url: `${serverConfig.host}:${serverConfig.port}`,
          },
        };
      },
      inject: [ConfigService],
    },
  );

  await app.listen();
}
bootstrap().catch(console.error);
