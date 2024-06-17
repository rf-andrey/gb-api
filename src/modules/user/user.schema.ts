import { z } from "zod";
import { buildJsonSchemas } from "fastify-zod";

import { isValidCpf } from "../../utils/validateCpf";
import { strings } from "../../utils/strings";

const userCore = {
  email: z.string().email({ message: strings.invalidEmailError }),
  username: z.string(),
  name: z.string(),
  cpf: z
    .string({ required_error: strings.mandatoryField })
    .length(11)
    .refine((cpf: string) => isValidCpf(cpf), strings.invalidCpfError),
  telephone: z.string().length(11, strings.invalidTelephoneError),
  birthDate: z.string().date(),
};

const createUserSchema = z.object({
  ...userCore,
  password: z.string(),
});

const createUserResponseSchema = z.object({
  id: z.number(),
  ...userCore,
});

const updateUserSchema = z.object({
  telephone: userCore.telephone.optional(),
  password: z.string().optional(),
});

const updateUserResponseSchema = createUserResponseSchema;

const loginSchema = z.object({
  username: z.string(),
  password: z.string(),
});

const loginResponseSchema = z.object({
  accessToken: z.string(),
  username: z.string(),
  name: z.string(),
  email: z.string(),
});

export const { schemas: userSchemas, $ref } = buildJsonSchemas(
  {
    createUserSchema,
    createUserResponseSchema,
    updateUserSchema,
    updateUserResponseSchema,
    loginSchema,
    loginResponseSchema,
  },
  { $id: "UserSchema" }
);

export type LoginInput = z.infer<typeof loginSchema>;
export type CreateUserInput = z.infer<typeof createUserSchema>;
export type UpdateUserInput = z.infer<typeof updateUserSchema>;
