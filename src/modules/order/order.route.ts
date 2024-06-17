import { FastifyInstance } from "fastify";
import {
  createOrderHandler,
  deleteOrderHandler,
  getOrderByIdHandler,
  getOrdersHandler,
  updateOrderHandler,
} from "./order.controller";
import { $ref } from "./order.schema";

async function orderRoutes(server: FastifyInstance) {
  server.post(
    "/",
    {
      preHandler: [server.auth],
      schema: {
        tags: ["Orders"],
        body: $ref("orderSchema"),
        response: {
          201: $ref("orderResponseSchema"),
        },
      },
    },
    createOrderHandler
  );

  server.get(
    "/",
    {
      preHandler: [server.auth],
      schema: {
        tags: ["Orders"],
      },
    },
    getOrdersHandler
  );

  server.get(
    "/:id",
    {
      preHandler: [server.auth],
      schema: {
        tags: ["Orders"],
      },
    },
    getOrderByIdHandler
  );

  server.put(
    "/:id",
    {
      preHandler: [server.auth],
      schema: {
        tags: ["Orders"],
        body: $ref("orderSchema"),
        response: {
          200: $ref("orderResponseSchema"),
        },
      },
    },
    updateOrderHandler
  );

  server.delete(
    "/:id",
    {
      preHandler: [server.auth],
      schema: {
        tags: ["Orders"],
      },
    },
    deleteOrderHandler
  );
}

export default orderRoutes;
