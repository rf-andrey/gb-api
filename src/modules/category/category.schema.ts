import { z } from "zod";
import { buildJsonSchemas } from "fastify-zod";

const categoryCore = {
  name: z.string().max(20),
  description: z.string().max(200),
};

const categorySchema = z.object({
  ...categoryCore,
});

const categoryResponseSchema = z.object({
  id: z.number(),
  ...categoryCore,
});

export const { schemas: categorySchemas, $ref } = buildJsonSchemas(
  {
    categorySchema,
    categoryResponseSchema,
  },
  {
    $id: "CategorySchema",
  }
);

export type CategoryInput = z.infer<typeof categorySchema>;
