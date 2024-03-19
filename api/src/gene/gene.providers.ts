import { Mongoose } from 'mongoose';
import { GeneSchema } from './schemas/gene.schema';

export const geneProviders = [
  {
    provide: 'GENE_MODEL',
    useFactory: (mongoose: Mongoose) =>
      mongoose.model('Gene', GeneSchema, 'datasets'),
    inject: ['DATABASE_CONNECTION'],
  },
];
