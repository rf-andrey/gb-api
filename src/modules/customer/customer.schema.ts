import { z } from "zod";
import { buildJsonSchemas } from "fastify-zod";

import { isValidCpf } from "../../utils/validateCpf";
import { strings } from "../../utils/strings";

const customerCore = {
  email: z.string().email({ message: strings.invalidEmailError }),
  username: z.string(),
  name: z.string(),
  cpf: z
    .string({ required_error: strings.mandatoryField })
    .length(11)
    .refine((cpf: string) => isValidCpf(cpf), strings.invalidCpfError),
  telephone: z.string().length(11, strings.invalidTelephoneError),
  birthDate: z.date(),
};

const createCustomerSchema = z.object({
  ...customerCore,
  password: z.string(),
});

const createCustomerResponseSchema = z.object({
  id: z.number(),
  ...customerCore,
});

export const { schemas: customerSchemas, $ref } = buildJsonSchemas(
  {
    createCustomerSchema,
    createCustomerResponseSchema,
  },
  { $id: "CustomerSchema" }
);

export type CreateCustomerInput = z.infer<typeof createCustomerSchema>;
