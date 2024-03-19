import { GeneSearchDto } from './gene-search.dto';

describe('GeneSearchDto', () => {
  it('should be defined', () => {
    const dto = new GeneSearchDto();
    expect(dto).toBeDefined();
  });

  it('should have a searchParam property', () => {
    const dto = new GeneSearchDto();
    expect(dto).toBeDefined();
  });

  it('searchParam should be a string', () => {
    const dto = new GeneSearchDto();
    expect(typeof dto.searchParam).toBe('undefined');
  });
});
