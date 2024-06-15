import { FastifyReply, FastifyRequest } from "fastify";
import { createUser, findUserByUsername } from "./user.service";
import { CreateUserInput, LoginInput } from "./user.schema";
import bcrypt from "bcrypt";
import { server } from "../../server";

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
  const { username, password } = request.body;

  const user = await findUserByUsername(username);

  const isMatch = user && (await bcrypt.compare(password, user.password));

  if (!user || !isMatch) {
    return reply.code(401).send({
      message: "Credenciais inválidas.",
    });
  }

  const payload = {
    id: user.id,
    username: user.username,
    email: user.email,
    name: user.name,
  };

  return { accessToken: server.jwt.sign(payload) };
}
