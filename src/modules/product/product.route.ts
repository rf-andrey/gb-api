import { FastifyInstance } from "fastify";
import {
  createProductHandler,
  deleteProductHandler,
  getProductByIdHandler,
  getProductsHandler,
  updateProductHandler,
} from "./product.controller";
import { $ref } from "./product.schema";

async function productRoutes(server: FastifyInstance) {
  server.post(
    "/",
    {
      preHandler: [server.auth],
      schema: {
        body: $ref("productSchema"),
        response: {
          201: $ref("productResponseSchema"),
        },
      },
    },
    createProductHandler
  );

  server.get(
    "/",
    {
      preHandler: [server.auth],
    },
    getProductsHandler
  );

  server.get(
    "/:id",
    {
      preHandler: [server.auth],
    },
    getProductByIdHandler
  );

  server.put(
    "/:id",
    {
      preHandler: [server.auth],
      schema: {
        body: $ref("productSchema"),
        response: {
          200: $ref("productResponseSchema"),
        },
      },
    },
    updateProductHandler
  );

  server.delete("/:id", deleteProductHandler);
}

export default productRoutes;
