import { z } from "zod";
import { buildJsonSchemas } from "fastify-zod";

const productCore = {
  name: z.string().max(50),
  description: z.string().max(200),
  price: z.number(),
  stockAmount: z.number(),
  categoryId: z.number(),
  image: z.string(),
};

const productSchema = z.object({
  ...productCore,
});

const productResponseSchema = z.object({
  id: z.number(),
  createdAt: z.string(),
  ...productCore,
});

export const { schemas: productSchemas, $ref } = buildJsonSchemas(
  {
    productSchema,
    productResponseSchema,
  },
  { $id: "ProductSchema" }
);

export type ProductInput = z.infer<typeof productSchema>;
