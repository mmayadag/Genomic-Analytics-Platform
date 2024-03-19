import { ApiProperty } from '@nestjs/swagger';

export class FindGenesWithPaginationDto {
  @ApiProperty({ minimum: 1, default: 1, description: 'Page number' })
  page: number = 1;

  @ApiProperty({
    minimum: 10,
    default: 50,
    maximum: 1000,
    description: 'Number of items per page',
  })
  limit: number = 50;

  @ApiProperty({ default: [], nullable: true, description: 'Array of genes' })
  genes: string[] = [];
}
