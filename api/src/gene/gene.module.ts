import { Module } from '@nestjs/common';
import { GeneService } from './gene.service';
import { GeneController } from './gene.controller';
import { DatabaseModule } from '../database/database.module';
import { geneProviders } from './gene.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [GeneController],
  providers: [GeneService, ...geneProviders],
})
export class GeneModule {}
