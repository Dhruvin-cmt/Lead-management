import * as z from "zod";

const techData = z.object({
  name: z.string(),
});

export { techData };
