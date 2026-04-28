import { z } from "zod";

export const developerSchema = z.object({
  developer_name: z
    .string()
    .min(1, "Name is required")
    .max(35, "Max 35 characters"),

  email: z.string().email("Invalid email"),

  joining_date: z
    .union([z.string().date(), z.date()])
    .optional()
    .or(z.literal("")),

  position: z.string().min(1, "Position is required"),

  salary: z.number().positive("Salary must be greater than 0"),

  expYearBeforeJoin: z.number().min(0).max(35, "Max 35 years"),

  expMonthBeforeJoin: z.number().min(0).max(11, "Max 11 months"),

  techskills: z.array(z.string()).min(1, "Select at least one skill"),

  //   isOnLeave: z.boolean().optional(),

  //   status: z.enum(["ACTIVE", "INACTIVE"]).optional(),
});

export const editDeveloperSchema = developerSchema
  .omit({ expYearBeforeJoin: true, expMonthBeforeJoin: true })
  .partial()
  .extend({
    id: z.string(),
    reliving_date: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.reliving_date) {
      const rel = new Date(data.reliving_date);
      const join = new Date(data.joining_date as string);

      if (rel <= join) {
        ctx.addIssue({
          path: ["reliving_date"],
          code: z.ZodIssueCode.custom,
          message: "Relieving Date must be after Joining Date",
        });
      }
    }
  });
