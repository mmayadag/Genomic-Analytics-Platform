import { z } from "zod";

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const taskSchema = z.object({
  _id: z.string(),
  control_rep1: z.number(),
  control_rep2: z.number(),
  control_rep3: z.number(),
  dataSet: z.string(),
  exper_rep1: z.number(),
  exper_rep2: z.number(),
  exper_rep3: z.number(),
  gene: z.string(),
  transcript: z.string(),
});

export type Task = z.infer<typeof taskSchema>;
