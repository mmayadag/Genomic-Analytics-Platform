export type GeneDataOption = {
  _id: string;
  gene: string;
  icon?: React.ComponentType<{ className?: string }>;
};

export type GeneDataList = GeneDataOption[];

export type GeneStats = {
  gene: string;
  mean: number;
  median: number;
  variance: number;
};

export type GeneDataResult = {
  transcript: string;
  dataSet: string;
  _id: string;
  control_rep1: number;
  control_rep2: number;
  control_rep3: number;
  exper_rep1: number;
  exper_rep2: number;
  exper_rep3: number;
  gene: string;
};
export type GeneDataTableType = GeneDataResult[];
