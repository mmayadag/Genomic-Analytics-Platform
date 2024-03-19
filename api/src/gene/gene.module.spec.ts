import { Test, TestingModule } from '@nestjs/testing';
import { GeneService } from './gene.service';
import { GeneController } from './gene.controller';
import { DatabaseModule } from '../database/database.module';
import { geneProviders } from './gene.providers';
import { ConfigModule } from '@nestjs/config';
import { getModelToken } from '@nestjs/mongoose';

jest.mock('mongoose', () => ({
  createConnection: jest.fn(),
  Schema: jest.fn(),
  connect: jest.fn(),
  model: jest.fn().mockReturnValue({}), // Ensure this mock matches the structure and behavior of your actual Mongoose models
}));

jest.mock('@nestjs/mongoose', () => ({
  getModelToken: () => 'Gene',
}));

describe('GeneModule', () => {
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [
        DatabaseModule,
        ConfigModule.forFeature(() => ({
          MONGO_URL: 'mongodb://test-url',
        })),
      ],
      controllers: [GeneController],
      providers: [
        GeneService,
        ...geneProviders,
        {
          provide: getModelToken('Gene'),
          useValue: {},
        },
      ],
    }).compile();
  });

  it('should be defined', () => {
    expect(module).toBeDefined();
  });
});
