import {
  calculateMean,
  calculateMedian,
  calculateVariance,
} from './statCalculation.util';

describe('Statistics Functions', () => {
  describe('calculateMean', () => {
    it('calculates the correct mean for an array of numbers', () => {
      expect(calculateMean([1, 2, 3, 4, 5])).toBe(3);
    });

    it('returns 0 for an empty array', () => {
      expect(calculateMean([])).toBe(0);
    });
  });

  describe('calculateMedian', () => {
    it('calculates the median for an array with odd length', () => {
      expect(calculateMedian([1, 2, 3])).toBe(2);
    });

    it('calculates the median for an array with even length', () => {
      expect(calculateMedian([1, 2, 3, 4])).toBe(2.5);
    });

    it('calculates the median for an array with a single element', () => {
      expect(calculateMedian([1])).toBe(1);
    });

    it('handles an empty array', () => {
      expect(calculateMedian([])).toBe(0);
    });
  });

  describe('calculateVariance', () => {
    it('calculates the variance for an array of numbers', () => {
      const data = [1, 2, 3, 4, 5];
      const mean = calculateMean(data);
      expect(calculateVariance(data, mean)).toBe(2);
    });

    it('calculates 0 variance for an array where all elements are the same', () => {
      const data = [5, 5, 5, 5, 5];
      const mean = calculateMean(data);
      expect(calculateVariance(data, mean)).toBe(0);
    });

    it('handles an empty array', () => {
      expect(calculateVariance([], 0)).toBe(0);
    });
  });
});
