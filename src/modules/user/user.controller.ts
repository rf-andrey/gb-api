import { FastifyReply, FastifyRequest } from "fastify";
import { createUser, findUserByUsername } from "./user.service";
import { CreateUserInput, LoginInput } from "./user.schema";

export async function createUserHandler(
  request: FastifyRequest<{
    Body: CreateUserInput;
  }>,
  reply: FastifyReply
) {
  const body = request.body;

  try {
    const user = await createUser(body);

    return reply.code(201).send(user);
  } catch (err) {
    console.error(err);
    return reply.code(500).send(err); //TODO: tratar status codes
  }
}

export async function loginHandler(
  request: FastifyRequest<{ Body: LoginInput }>,
  reply: FastifyReply
) {
  const body = request.body;

  const user = await findUserByUsername(body.username);
}
