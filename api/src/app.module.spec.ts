import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from './app.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { GeneService } from './gene/gene.service';
import { geneProviders } from './gene/gene.providers';

jest.mock('mongoose', () => ({
  createConnection: jest.fn(),
  Schema: jest.fn(),
  connect: jest.fn(),
  model: jest.fn().mockReturnValue({}),
}));

describe('AppModule', () => {
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [
        AppModule,
        ConfigModule.forFeature(() => ({
          MONGO_URL: 'mongodb://test-url',
        })),
      ],
      controllers: [AppController],
      providers: [
        AppService,
        GeneService,
        ...geneProviders,
        {
          provide: 'GENE_MODEL',
          useValue: {}, // Use the mock as the value for GENE_MODEL
        },
        {
          provide: 'DATABASE_CONNECTION',
          useValue: {
            model: jest.fn().mockReturnValue({}),
          },
        },
      ],
    }).compile();
  });

  it('should be defined', () => {
    expect(module).toBeDefined();
  });
});
