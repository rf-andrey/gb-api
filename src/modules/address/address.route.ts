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
        tags: ["Addresses"],
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
      schema: {
        tags: ["Addresses"],
      },
    },
    getAddressesHandler
  );

  server.get(
    "/:id",
    {
      preHandler: [server.auth],
      schema: {
        tags: ["Addresses"],
      },
    },
    getAddressByIdHandler
  );

  server.put(
    "/:id",
    {
      preHandler: [server.auth],
      schema: {
        tags: ["Addresses"],
        body: $ref("addressSchema"),
        response: {
          200: $ref("addressResponseSchema"),
        },
      },
    },
    updateAddressHandler
  );

  server.delete(
    "/:id",
    {
      preHandler: [server.auth],
      schema: {
        tags: ["Addresses"],
      },
    },
    deleteAddressHandler
  );
}

export default addressRoutes;
