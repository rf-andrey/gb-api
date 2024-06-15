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

const addressSchema = z.object({
  ...addressCore,
});

const addressResponseSchema = z.object({
  id: z.number(),
  ...addressCore,
});

export const { schemas: addressSchemas, $ref } = buildJsonSchemas(
  {
    addressSchema,
    addressResponseSchema,
  },
  { $id: "AddressSchema" }
);

export type AddressInput = z.infer<typeof addressSchema>;
