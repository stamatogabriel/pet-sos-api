import { Test, TestingModule } from '@nestjs/testing';
import { ThrifStoreService } from './thrif-store.service';

describe('ThrifStoreService', () => {
  let service: ThrifStoreService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ThrifStoreService],
    }).compile();

    service = module.get<ThrifStoreService>(ThrifStoreService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
