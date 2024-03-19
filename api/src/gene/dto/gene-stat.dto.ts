import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class GeneStatsDto {
  @ApiProperty({
    example: 'C230091D08Rik',
    description: 'The name of the gene',
  })
  @IsString()
  gene: string;
}
