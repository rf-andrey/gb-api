import { FastifyInstance } from "fastify";
import {
  createAddressHandler,
  deleteAddressHandler,
  getAddressByIdHandler,
  getAddressesHandler,
  updateAddressHandler,
} from "./address.controller";
import { $ref } from "./address.schema";

async function addressRoutes(server: FastifyInstance) {
  server.post(
    "/",
    {
      preHandler: [server.auth],
      schema: {
        body: $ref("addressSchema"),
        response: {
          201: $ref("addressResponseSchema"),
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
    getAddressByIdHandler
  );

  server.put(
    "/:id",
    {
      preHandler: [server.auth],
      schema: {
        body: $ref("addressSchema"),
        response: {
          200: $ref("addressResponseSchema"),
        },
      },
    },
    updateAddressHandler
  );

  server.delete("/:id", deleteAddressHandler);
}

export default addressRoutes;
