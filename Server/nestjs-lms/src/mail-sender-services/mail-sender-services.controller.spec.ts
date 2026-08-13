import { Test, TestingModule } from '@nestjs/testing';
import { MailSenderServicesController } from './mail-sender-services.controller';

describe('MailSenderServicesController', () => {
  let controller: MailSenderServicesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MailSenderServicesController],
    }).compile();

    controller = module.get<MailSenderServicesController>(MailSenderServicesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
