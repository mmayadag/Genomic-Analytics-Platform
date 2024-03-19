import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class GeneSearchDto {
  @ApiProperty({
    example: 'c2',
    description: 'The search parameter for the gene',
  })
  @IsString()
  searchParam: string;
}
