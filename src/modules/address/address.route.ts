import { FastifyInstance } from "fastify";
import { createAddressHandler } from "./address.controller";
import { $ref } from "./address.schema";

async function addressRoutes(server: FastifyInstance) {
  server.post(
    "/",
    {
      preHandler: [server.auth],
      schema: {
        body: $ref("createAddressSchema"),
        response: {
          201: $ref("createAddressResponseSchema"),
        },
      },
    },
    createAddressHandler
  );
}

export default addressRoutes;
