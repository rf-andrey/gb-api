import { z } from "zod";
import { buildJsonSchemas } from "fastify-zod";

const orderProductCore = {
  quantity: z.number(),
  productId: z.number(),
  orderId: z.number(),
};

const orderProductSchema = z.object({
  ...orderProductCore,
});

const orderProductResponseSchema = z.object({
  id: z.number(),
  ...orderProductCore,
});

export const { schemas: orderProductSchemas, $ref } = buildJsonSchemas(
  {
    orderProductSchema,
    orderProductResponseSchema,
  },
  { $id: "OrderProductSchema" }
);

export type OrderProductInput = z.infer<typeof orderProductSchema>;
