import { Test, TestingModule } from '@nestjs/testing';
import { FrontendService } from './frontend.service';
import { AppModule } from '../app.module';

describe('FrontendService', () => {
  let service: FrontendService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    service = module.get<FrontendService>(FrontendService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
