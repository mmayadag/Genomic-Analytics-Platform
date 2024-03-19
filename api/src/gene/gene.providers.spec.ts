import { Mongoose } from 'mongoose';
import { geneProviders } from './gene.providers';
import { GeneSchema } from './schemas/gene.schema';

describe('geneProviders', () => {
  it('should create a Gene model', () => {
    const modelSpy = jest.fn();
    const mongooseMock: Partial<Mongoose> = {
      model: modelSpy,
    };

    const geneModelProvider = geneProviders.find(
      (provider) => provider.provide === 'GENE_MODEL',
    );

    expect(geneModelProvider).toBeDefined();

    geneModelProvider.useFactory(mongooseMock as Mongoose);

    expect(modelSpy).toHaveBeenCalledWith('Gene', GeneSchema, 'datasets');
  });
});
