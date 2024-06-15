import { FastifyReply, FastifyRequest } from "fastify";
import {
  createProduct,
  deleteProduct,
  findProduct,
  findProducts,
  updateProduct,
} from "./product.service";
import { ProductInput } from "./product.schema";

export async function createProductHandler(
  request: FastifyRequest<{
    Body: ProductInput;
  }>,
  reply: FastifyReply
) {
  const { body } = request;

  try {
    const product = await createProduct(body);

    return reply.code(201).send(product);
  } catch (err) {
    console.error(err);
    return reply.code(500).send(err); //TODO: tratar status codes
  }
}

export async function getProductsHandler() {
  const addresses = await findProducts();

  return addresses;
}

export async function getProductByIdHandler(
  request: FastifyRequest<{ Params: { id: string } }>
) {
  const {
    params: { id },
  } = request;

  const requestId = parseInt(id);

  const address = await findProduct(requestId);

  return address;
}

export async function updateProductHandler(
  request: FastifyRequest<{ Body: ProductInput; Params: { id: string } }>,
  reply: FastifyReply
) {
  try {
    const {
      body,
      params: { id },
    } = request;

    const requestId = parseInt(id);

    const product = await updateProduct({ id: requestId, ...body });

    return reply.code(200).send(product);
  } catch (err) {
    console.error(err);
    return reply.code(500).send(err);
  }
}

export async function deleteProductHandler(
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) {
  const {
    params: { id },
  } = request;

  const requestId = parseInt(id);

  const product = await deleteProduct(requestId);

  return reply.code(200).send(product);
}
