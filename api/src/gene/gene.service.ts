import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Gene } from './interfaces/gene.interface';
import {
  calculateMean,
  calculateMedian,
  calculateVariance,
} from './utils/statCalculation.util';

@Injectable()
export class GeneService {
  constructor(@Inject('GENE_MODEL') private geneModel: Model<Gene>) {}

  findAll({
    page,
    limit,
    genes,
  }: {
    page: number;
    limit: number;
    genes: string[];
  }): Promise<Gene[]> {
    const skip = (page - 1) * limit;
    const query =
      genes?.length > 0
        ? this.geneModel.find({ gene: { $in: genes } })
        : this.geneModel.find();

    return query.skip(skip).limit(limit).exec();
  }

  findOne(gene: string) {
    return this.geneModel.find({ gene }).exec();
  }

  findGenes(searchParam: string) {
    if (searchParam === '') {
      return this.geneModel.find({}).select('gene').limit(10);
    }
    const query = this.geneModel
      .find({
        gene: new RegExp('.*' + searchParam + '.*', 'i'),
      })
      .select('gene')
      .limit(10);
    return query.exec();
  }

  async computeGeneStats(gene: string, data: Gene): Promise<any> {
    const expressionData = [data.exper_rep1, data.exper_rep2, data.exper_rep3];
    const mean = calculateMean(expressionData);
    const median = calculateMedian(expressionData);
    const variance = calculateVariance(expressionData, mean);

    return { gene, mean, median, variance };
  }
}
