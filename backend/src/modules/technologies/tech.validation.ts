
import * as z from "zod";
import { TechCategoryEnum } from "../../validations/common.js";

export const technologySchema = z.object({
  name: z.string().min(1, "Technology name is required"),

  category: TechCategoryEnum,

  isDelete: z.boolean().optional(),
});

export type techStackData = z.infer<typeof technologySchema>