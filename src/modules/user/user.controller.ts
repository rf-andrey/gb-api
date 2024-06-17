import { FastifyReply, FastifyRequest } from "fastify";
import {
  createUser,
  deleteUser,
  findUser,
  findUserByUsername,
  findUsers,
  updateUser,
} from "./user.service";
import { CreateUserInput, LoginInput, UpdateUserInput } from "./user.schema";
import bcrypt from "bcrypt";
import { server } from "../../server";

export async function createUserHandler(
  request: FastifyRequest<{
    Body: CreateUserInput;
  }>,
  reply: FastifyReply
) {
  const { body } = request;

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

  return { accessToken: server.jwt.sign(payload), ...payload };
}

export async function getUsersHandler() {
  const users = await findUsers();

  return users;
}

export async function getUserByIdHandler(
  request: FastifyRequest<{ Params: { id: string } }>
) {
  const {
    params: { id },
  } = request;

  const requestId = parseInt(id);

  const user = await findUser(requestId);

  return user;
}

export async function updateUserHandler(
  request: FastifyRequest<{ Body: UpdateUserInput; Params: { id: string } }>,
  reply: FastifyReply
) {
  try {
    const {
      body: { telephone, password },
      params: { id },
    } = request;

    const requestId = parseInt(id);

    const user = await updateUser({
      id: requestId,
      telephone,
      password,
    });

    return reply.code(200).send(user);
  } catch (err) {
    console.error(err);
    return reply.code(500).send(err); //TODO: tratar status codes
  }
}

export async function deleteUserHandler(
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) {
  const {
    params: { id },
  } = request;

  const requestId = parseInt(id);

  const user = await deleteUser(requestId);

  return reply.code(200).send(user);
}
