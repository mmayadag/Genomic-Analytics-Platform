import { Document } from 'mongoose';

export interface Gene extends Document {
  readonly gene: string;
  readonly transcript: string;
  readonly exper_rep1: number;
  readonly exper_rep2: number;
  readonly exper_rep3: number;
  readonly control_rep1: number;
  readonly control_rep2: number;
  readonly control_rep3: number;
  readonly dataSet: string;
}
