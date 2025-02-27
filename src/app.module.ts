import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { validate } from './config/validate';
import { VerifyEmailController } from './controllers/verify.controller';
import { MailerService } from './services/mailer.service';
import { HealthController } from './controllers/health.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: validate,
      isGlobal: true,
    }),
  ],
  controllers: [VerifyEmailController, HealthController],
  providers: [MailerService],
})
export class AppModule {}
