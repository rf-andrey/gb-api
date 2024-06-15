import { FastifyInstance } from "fastify";
import { createCustomerHandler } from "./customer.controller";
import { $ref } from "./customer.schema";

async function customerRoutes(server: FastifyInstance) {
  server.post(
    "/",
    {
      schema: {
        body: $ref("createCustomerSchema"),
        response: {
          201: $ref("createCustomerResponseSchema"),
        },
      },
    },
    createCustomerHandler
  );
}

export default customerRoutes;
