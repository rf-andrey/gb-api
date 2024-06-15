import { FastifyReply, FastifyRequest } from "fastify";
import {
  createOrder,
  deleteOrder,
  findOrder,
  findOrderes,
  updateOrder,
} from "./order.service";
import { OrderInput } from "./order.schema";

export async function createOrderHandler(
  request: FastifyRequest<{
    Body: OrderInput;
  }>,
  reply: FastifyReply
) {
  const {
    body,
    user: { id },
  } = request;

  try {
    const order = await createOrder({ ...body, userId: id });

    return reply.code(201).send(order);
  } catch (err) {
    console.error(err);
    return reply.code(500).send(err); //TODO: tratar status codes
  }
}

export async function getOrderesHandler() {
  const orderes = await findOrderes();

  return orderes;
}

export async function getOrderByIdHandler(
  request: FastifyRequest<{ Params: { id: string } }>
) {
  const {
    params: { id },
  } = request;

  const requestId = parseInt(id);

  const order = await findOrder(requestId);

  return order;
}

export async function updateOrderHandler(
  request: FastifyRequest<{ Body: OrderInput; Params: { id: string } }>,
  reply: FastifyReply
) {
  try {
    const {
      body,
      params: { id },
    } = request;

    const requestId = parseInt(id);

    const order = await updateOrder({ id: requestId, ...body });

    return reply.code(200).send(order);
  } catch (err) {
    console.error(err);
    return reply.code(500).send(err);
  }
}

export async function deleteOrderHandler(
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) {
  const {
    params: { id },
  } = request;

  const requestId = parseInt(id);

  const order = await deleteOrder(requestId);

  return reply.code(200).send(order);
}
