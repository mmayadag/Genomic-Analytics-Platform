import { Test, TestingModule } from '@nestjs/testing';
import { GeneController } from './gene.controller';
import { GeneService } from './gene.service';
import { NotFoundException } from '@nestjs/common';

describe('GeneController', () => {
  let controller: GeneController;
  let service: GeneService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GeneController],
      providers: [
        GeneService,
        {
          provide: 'GENE_MODEL',
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get<GeneController>(GeneController);
    service = module.get<GeneService>(GeneService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of genes', async () => {
      const result = [{ name: 'gene1' }, { name: 'gene2' }];
      jest
        .spyOn(service, 'findAll')
        .mockImplementation(() => Promise.resolve(result as any));

      expect(await controller.findAll()).toBe(result);
    });
  });

  describe('findAllWithGenes', () => {
    it('should return an array of genes with specified genes', async () => {
      const result = [{ name: 'gene1' }, { name: 'gene2' }];
      const dto = { page: 1, limit: 10, genes: [] };
      jest
        .spyOn(service, 'findAll')
        .mockImplementation(() => Promise.resolve(result as any));

      expect(await controller.findAllWithGenes(dto)).toBe(result);
    });
  });

  describe('findOne', () => {
    it('should return a gene with the specified search parameter', async () => {
      const result = { name: 'gene1' };
      const searchParam = 'c2';
      jest
        .spyOn(service, 'findGenes')
        .mockImplementation(() => Promise.resolve(result as any));

      expect(await controller.findOne(searchParam)).toBe(result);
    });
  });

  describe('getGeneStats', () => {
    it('should return the computed statistics for a gene', async () => {
      const geneStatsDto = { gene: 'gene1' };
      const data = [{ name: 'gene1', stats: { count: 10 } }];
      jest
        .spyOn(service, 'findOne')
        .mockImplementation(() => Promise.resolve(data as any)); // Add 'as any' to resolve the type error
      jest
        .spyOn(service, 'computeGeneStats')
        .mockImplementation(() => Promise.resolve(data[0]));

      expect(await controller.getGeneStats(geneStatsDto)).toBe(data[0]);
    });

    it('should throw NotFoundException if gene is not found', async () => {
      const geneStatsDto = { gene: 'gene1' };
      const data = [];
      jest
        .spyOn(service, 'findOne')
        .mockImplementation(() => Promise.resolve(data));

      await expect(controller.getGeneStats(geneStatsDto)).rejects.toThrowError(
        NotFoundException,
      );
    });
  });
});
