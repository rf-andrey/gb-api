import { z } from "zod";
import { buildJsonSchemas } from "fastify-zod";

const orderCore = {
  orderNumber: z.number(),
  totalAmount: z.number(),
  status: z.boolean(),
};

const orderSchema = z.object({
  ...orderCore,
});

const orderResponseSchema = z.object({
  id: z.number(),
  ...orderCore,
});

export const { schemas: orderSchemas, $ref } = buildJsonSchemas(
  { orderSchema, orderResponseSchema },
  { $id: "OrderSchema" }
);

export type OrderInput = z.infer<typeof orderSchema>;
