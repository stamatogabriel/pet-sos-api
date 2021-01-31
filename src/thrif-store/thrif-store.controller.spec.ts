import { Test, TestingModule } from '@nestjs/testing';
import { ThrifStoreController } from './thrif-store.controller';

describe('ThrifStoreController', () => {
  let controller: ThrifStoreController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ThrifStoreController],
    }).compile();

    controller = module.get<ThrifStoreController>(ThrifStoreController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
