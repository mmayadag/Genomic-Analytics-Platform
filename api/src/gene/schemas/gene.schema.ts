import * as mongoose from 'mongoose';

export const GeneSchema = new mongoose.Schema({
  gene: String,
  transcript: String,
  exper_rep1: { type: Number, default: 0.0 },
  exper_rep2: { type: Number, default: 0.0 },
  exper_rep3: { type: Number, default: 0.0 },
  control_rep1: { type: Number, default: 0.0 },
  control_rep2: { type: Number, default: 0.0 },
  control_rep3: { type: Number, default: 0.0 },
  dataSet: { type: String, default: 'sample_demo' },
});
