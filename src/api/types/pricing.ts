import { z } from "zod";

const accessSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  seconds_limit: z.number(),
});

const planAccessRightsSchema = z.object({
  access: accessSchema,
});

export const ZPlanSchema = z.object({
  id: z.string(),
  created_at: z.string().datetime(),
  title: z.string(),
  description: z.string(),
  amount: z.number(),
  currency: z.string(),
  deleted_at: z.null(),
  planAccessRights: z.array(planAccessRightsSchema),
});

export const ZApiResponseSchema = z.object({
  is_error: z.boolean(),
  message: z.string(),
  correlator_id: z.string(),
  data: z.array(ZPlanSchema),
});
