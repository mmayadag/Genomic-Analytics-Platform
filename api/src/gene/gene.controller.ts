import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  NotFoundException,
} from '@nestjs/common';
import { GeneService } from './gene.service';
import {
  ApiBody,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiProperty,
  ApiTags,
} from '@nestjs/swagger';
import { FindGenesWithPaginationDto } from './dto/find-genes-with-pagination.dto';
import { GeneStatsDto } from './dto/gene-stat.dto';

@ApiTags('genomics')
@Controller('gene')
export class GeneController {
  constructor(private readonly geneService: GeneService) {}

  @Get('/')
  findAll() {
    return this.geneService.findAll({ page: 1, limit: 10, genes: [] });
  }

  @Post('/')
  @ApiOperation({ summary: 'Get all genes with specified genes' })
  @ApiOkResponse({ description: 'Returns all genes with the specified genes.' })
  @ApiBody({ type: FindGenesWithPaginationDto })
  findAllWithGenes(
    @Body()
    body: Partial<FindGenesWithPaginationDto>,
  ) {
    const paginationDto = new FindGenesWithPaginationDto();
    const dto = { ...paginationDto, ...body };
    return this.geneService.findAll(dto);
  }

  @Get(':searchParam')
  @ApiOperation({ summary: 'Find a gene by search parameter' })
  @ApiOkResponse({
    description: 'Returns the gene with the specified search parameter.',
  })
  @ApiNotFoundResponse({ description: 'Gene not found' })
  @ApiProperty({
    example: 'c2',
    description: 'The search parameter for the gene',
  })
  findOne(@Param('searchParam') searchParam: string) {
    return this.geneService.findGenes(searchParam);
  }

  @Post('gene-stats')
  @ApiOperation({ summary: 'Get gene statistics' })
  @ApiOkResponse({ description: 'Returns the computed statistics for a gene.' })
  @ApiBody({ type: GeneStatsDto })
  @ApiNotFoundResponse({ description: 'Gene not found' })
  async getGeneStats(@Body() geneStatsDto: GeneStatsDto) {
    const data = await this.geneService.findOne(geneStatsDto.gene);
    if (!data || data.length === 0) {
      throw new NotFoundException(
        'Gene not found',
        `Gene with ID ${geneStatsDto.gene} not found`,
      );
    }
    return this.geneService.computeGeneStats(geneStatsDto.gene, data[0]);
  }
}
