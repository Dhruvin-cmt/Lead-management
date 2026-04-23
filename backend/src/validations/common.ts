import { z } from "zod";

export const TechCategoryEnum = z.enum([
  "FRONTEND",
  "BACKEND",
  "DATABASE",
  "TOOL",
  "DATA_SCIENCE",
]);

export const DevStatusEnum = z.enum(["ACTIVE", "INACTIVE"]);
