import { FastifyReply, FastifyRequest } from "fastify";
import { createCustomer } from "./customer.service";
import { CreateCustomerInput } from "./customer.schema";

export async function createCustomerHandler(
  request: FastifyRequest<{
    Body: CreateCustomerInput;
  }>,
  reply: FastifyReply
) {
  const body = request.body;

  try {
    const customer = await createCustomer(body);

    return reply.code(201).send(customer);
  } catch (err) {
    console.error(err);
    return reply.code(500).send(err); //TODO: tratar status codes
  }
}
