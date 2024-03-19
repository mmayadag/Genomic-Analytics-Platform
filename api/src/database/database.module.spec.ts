import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule } from '@nestjs/config';

describe('DatabaseModule', () => {
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [ConfigModule],
      providers: [],
    }).compile();
  });

  it('should be defined', () => {
    expect(module).toBeDefined();
  });
});
