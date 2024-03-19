export const calculateMean = (data: number[]): number => {
  if (data.length === 0) return 0;
  const sum = data.reduce((a, b) => a + b, 0);
  return sum / data.length;
};

export const calculateMedian = (data: number[]): number => {
  if (data.length === 0) return 0;
  data.sort((a, b) => a - b);
  const mid = Math.floor(data.length / 2);
  return data.length % 2 !== 0 ? data[mid] : (data[mid - 1] + data[mid]) / 2;
};

export const calculateVariance = (data: number[], mean: number): number => {
  if (data.length === 0) return 0;
  const sum = data.reduce((a, b) => a + Math.pow(b - mean, 2), 0);
  return sum / data.length;
};
