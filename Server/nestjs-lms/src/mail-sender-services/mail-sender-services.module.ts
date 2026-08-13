import { Module } from '@nestjs/common';
import { MailSenderServicesService } from './mail-sender-services.service';
import { MailSenderServicesController } from './mail-sender-services.controller';

@Module({
  providers: [MailSenderServicesService],
  controllers: [MailSenderServicesController]
})
export class MailSenderServicesModule {}
