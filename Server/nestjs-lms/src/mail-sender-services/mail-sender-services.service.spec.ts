import { Test, TestingModule } from '@nestjs/testing';
import { MailSenderServicesService } from './mail-sender-services.service';

describe('MailSenderServicesService', () => {
  let service: MailSenderServicesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MailSenderServicesService],
    }).compile();

    service = module.get<MailSenderServicesService>(MailSenderServicesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
