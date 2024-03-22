import { Test, TestingModule } from '@nestjs/testing';
import { GeneService } from './gene.service';
//import { Model } from 'mongoose';
import { Gene } from './interfaces/gene.interface';
import { ConfigModule, ConfigService } from '@nestjs/config';

const mockGene = { gene: 'gene1', exper_rep1: 1, exper_rep2: 2, exper_rep3: 3 };

const mockGeneModel = {
  find: jest.fn().mockReturnThis(),
  skip: jest.fn().mockReturnThis(),
  limit: jest.fn().mockReturnThis(),
  exec: jest.fn().mockResolvedValue([mockGene]),
  select: jest.fn().mockReturnThis(),
};

describe('GeneService', () => {
  let service: GeneService;
  //  let model: Model<Gene>;
  //  let configService: ConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GeneService,
        {
          provide: 'GENE_MODEL',
          useValue: mockGeneModel,
        },
      ],
      imports: [
        ConfigModule.forFeature(async () => ({
          MONGO_URL: 'mongodb://test-url',
        })),
      ],
    }).compile();

    configService = module.get<ConfigService>(ConfigService);
    service = module.get<GeneService>(GeneService);
  });

  describe('findOne', () => {
    it('should find a single gene', async () => {
      const gene1 = await service.findOne('gene1');
      expect(gene1).toEqual([mockGene]);
    });
  });

  describe('findGenes', () => {
    it('should find genes with search parameter', async () => {
      const result = await service.findGenes('gene');
      expect(JSON.stringify(result)).toEqual(JSON.stringify([mockGene]));
    });

    it('should handle empty search parameter', async () => {
      const result = await service.findGenes('');
      expect(result).toBe(mockGeneModel);
    });
  });

  describe('findAll', () => {
    it('should return an array of genes', async () => {
      const result = await service.findAll({ page: 1, limit: 10, genes: [] });
      expect(JSON.stringify(result)).toEqual(JSON.stringify([mockGene]));
    });

    it('should handle gene filtering', async () => {
      const result = await service.findAll({
        page: 2,
        limit: 50,
        genes: ['gene1'],
      });
      expect(result).toEqual([mockGene]);
    });

    it('should handle gene filtering', async () => {
      const result = await service.findAll({
        page: 1,
        limit: 10,
        genes: ['gene1', 'gene2'],
      });
      expect(result).toEqual([mockGene]);
    });
  });

  describe('computeGeneStats', () => {
    it('should compute statistics for gene data', async () => {
      const result = await service.computeGeneStats('gene1', mockGene as Gene);
      expect(result).toEqual({
        gene: 'gene1',
        mean: expect.any(Number),
        median: expect.any(Number),
        variance: expect.any(Number),
      });
    });
  });
});
