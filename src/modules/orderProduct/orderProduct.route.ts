import { FastifyInstance } from "fastify";
import {
  createOrderProductHandler,
  deleteOrderProductHandler,
  getOrderProductByIdHandler,
  getOrderProductesHandler,
  updateOrderProductHandler,
} from "./orderProduct.controller";
import { $ref } from "./orderProduct.schema";

async function orderProductRoutes(server: FastifyInstance) {
  server.post(
    "/",
    {
      preHandler: [server.auth],
      schema: {
        body: $ref("orderProductSchema"),
        response: {
          201: $ref("orderProductResponseSchema"),
        },
      },
    },
    createOrderProductHandler
  );

  server.get(
    "/",
    {
      preHandler: [server.auth],
    },
    getOrderProductesHandler
  );

  server.get(
    "/:id",
    {
      preHandler: [server.auth],
    },
    getOrderProductByIdHandler
  );

  server.put(
    "/:id",
    {
      preHandler: [server.auth],
      schema: {
        body: $ref("orderProductSchema"),
        response: {
          200: $ref("orderProductResponseSchema"),
        },
      },
    },
    updateOrderProductHandler
  );

  server.delete("/:id", deleteOrderProductHandler);
}

export default orderProductRoutes;
