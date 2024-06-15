import { FastifyReply, FastifyRequest } from "fastify";
import {
  createAddress,
  deleteAddress,
  findAddress,
  findAddresses,
  updateAddress,
} from "./address.service";
import { AddressInput } from "./address.schema";

export async function createAddressHandler(
  request: FastifyRequest<{
    Body: AddressInput;
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

export async function getAddressByIdHandler(
  request: FastifyRequest<{ Params: { id: string } }>
) {
  const {
    params: { id },
  } = request;

  const requestId = parseInt(id);

  const address = await findAddress(requestId);

  return address;
}

export async function updateAddressHandler(
  request: FastifyRequest<{ Body: AddressInput; Params: { id: string } }>,
  reply: FastifyReply
) {
  try {
    const {
      body,
      params: { id },
    } = request;

    const requestId = parseInt(id);

    const address = await updateAddress({ id: requestId, ...body });

    return reply.code(200).send(address);
  } catch (err) {
    console.error(err);
    return reply.code(500).send(err);
  }
}

export async function deleteAddressHandler(
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) {
  const {
    params: { id },
  } = request;

  const requestId = parseInt(id);

  const address = await deleteAddress(requestId);

  return reply.code(200).send(address);
}
