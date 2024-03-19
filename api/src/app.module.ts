import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GeneModule } from './gene/gene.module';

@Module({
  imports: [GeneModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
