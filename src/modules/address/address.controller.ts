import { FastifyReply, FastifyRequest } from "fastify";
import { createAddress, findAddress, findAddresses } from "./address.service";
import { CreateAddressInput } from "./address.schema";

export async function createAddressHandler(
  request: FastifyRequest<{
    Body: CreateAddressInput;
  }>,
  reply: FastifyReply
) {
  const { body } = request;
  const user = request.user;

  try {
    const address = await createAddress({ ...body, userId: request.user.id });

    return reply.code(201).send(address);
  } catch (err) {
    console.error(err);
    return reply.code(500).send(err); //TODO: tratar status codes
  }
}

export async function getAddressesHandler() {
  const addresses = await findAddresses();

  return addresses;
}

export async function getAddressById(
  request: FastifyRequest<{ Params: { id: string } }>
) {
  const {
    params: { id },
  } = request;

  const requestId = parseInt(id);

  const address = await findAddress(requestId);

  return address;
}
