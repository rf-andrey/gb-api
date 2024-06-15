import { z } from "zod";
import { buildJsonSchemas } from "fastify-zod";

const addressCore = {
  postalCode: z.string().length(9),
  street: z.string().max(100),
  district: z.string().max(30),
  city: z.string().max(30),
  number: z.string().max(10),
  complement: z.string().max(100),
  uf: z.string().length(2),
};

const createAddressSchema = z.object({
  ...addressCore,
});

const createAddressResponseSchema = z.object({
  id: z.number(),
  ...addressCore,
});

export const { schemas: addressSchemas, $ref } = buildJsonSchemas(
  {
    createAddressSchema,
    createAddressResponseSchema,
  },
  { $id: "AddressSchema" }
);

export type CreateAddressInput = z.infer<typeof createAddressSchema>;
