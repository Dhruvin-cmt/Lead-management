import { z } from "zod";
import { DevStatusEnum } from "../../validations/common.js";

export const baseDeveloperSchema = z.object({
  developer_name: z.string().min(1),

  email: z.string().email(),

  joining_date: z.coerce.date().optional(),

  expYearBeforeJoin: z.number().int().min(0),

  expMonthBeforeJoin: z.number().int().min(0).max(11),

  position: z.string().min(1),

  reliving_date: z.coerce.date().optional(),

  salary: z.coerce.number().nonnegative(),

  isOnLeave: z.boolean().optional(),

  status: DevStatusEnum.optional(),

  // 👇 IMPORTANT (IDs from frontend)
  techskills: z.array(z.string().cuid()).min(1, "At least one tech required"),
});

export const createDeveloperSchema = baseDeveloperSchema.superRefine(
  (data, ctx) => {
    if (
      data.reliving_date &&
      data.joining_date &&
      data.reliving_date <= data.joining_date
    ) {
      ctx.addIssue({
        path: ["reliving_date"],
        code: z.ZodIssueCode.custom,
        message: "Relieving date must be after joining date",
      });
    }
  }
);

export const getDeveloperQuerySchema = z.object({
  page: z.coerce.number().min(1).default(1),

  limit: z.coerce.number().min(1).max(50).default(10),

  status: DevStatusEnum.optional(),

  isOnLeave: z.coerce.boolean().optional(),

  search: z.string().optional(),
});

export const updateDeveloperSchema = baseDeveloperSchema
  .partial()
  .superRefine((data, ctx) => {
    if (
      data.reliving_date &&
      data.joining_date &&
      data.reliving_date <= data.joining_date
    ) {
      ctx.addIssue({
        path: ["reliving_date"],
        code: z.ZodIssueCode.custom,
        message: "Relieving date must be after joining date",
      });
    }
  })
  .transform((data) => {
    return Object.fromEntries(
      Object.entries(data).filter(([_, v]) => v !== undefined)
    );
  });

export type updateDevBody = z.infer<typeof updateDeveloperSchema>;

export type createDevBody = z.infer<typeof createDeveloperSchema>;

export type fetchDevBody = z.infer<typeof getDeveloperQuerySchema>;
