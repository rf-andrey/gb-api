import { FastifyInstance } from "fastify";
import {
  createAddressHandler,
  getAddressById,
  getAddressesHandler,
} from "./address.controller";
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

  server.get(
    "/",
    {
      preHandler: [server.auth],
    },
    getAddressesHandler
  );

  server.get(
    "/:id",
    {
      preHandler: [server.auth],
    },
    getAddressById
  );
}

export default addressRoutes;
