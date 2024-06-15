import { FastifyReply, FastifyRequest } from "fastify";
import {
  createOrderProduct,
  deleteOrderProduct,
  findOrderProduct,
  findOrderProductes,
  updateOrderProduct,
} from "./orderProduct.service";
import { OrderProductInput } from "./orderProduct.schema";

export async function createOrderProductHandler(
  request: FastifyRequest<{
    Body: OrderProductInput;
  }>,
  reply: FastifyReply
) {
  const { body } = request;

  try {
    const orderProduct = await createOrderProduct(body);

    return reply.code(201).send(orderProduct);
  } catch (err) {
    console.error(err);
    return reply.code(500).send(err); //TODO: tratar status codes
  }
}

export async function getOrderProductesHandler() {
  const orderProductes = await findOrderProductes();

  return orderProductes;
}

export async function getOrderProductByIdHandler(
  request: FastifyRequest<{ Params: { id: string } }>
) {
  const {
    params: { id },
  } = request;

  const requestId = parseInt(id);

  const orderProduct = await findOrderProduct(requestId);

  return orderProduct;
}

export async function updateOrderProductHandler(
  request: FastifyRequest<{ Body: OrderProductInput; Params: { id: string } }>,
  reply: FastifyReply
) {
  try {
    const {
      body,
      params: { id },
    } = request;

    const requestId = parseInt(id);

    const orderProduct = await updateOrderProduct({ id: requestId, ...body });

    return reply.code(200).send(orderProduct);
  } catch (err) {
    console.error(err);
    return reply.code(500).send(err);
  }
}

export async function deleteOrderProductHandler(
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) {
  const {
    params: { id },
  } = request;

  const requestId = parseInt(id);

  const orderProduct = await deleteOrderProduct(requestId);

  return reply.code(200).send(orderProduct);
}
