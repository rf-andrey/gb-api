import { FastifyInstance } from "fastify";
import {
  createUserHandler,
  deleteUserHandler,
  getUsersHandler,
  loginHandler,
  updateUserHandler,
} from "./user.controller";
import { $ref } from "./user.schema";

async function userRoutes(server: FastifyInstance) {
  server.post(
    "/",
    {
      schema: {
        tags: ["Users"],
        body: $ref("createUserSchema"),
        response: {
          201: $ref("createUserResponseSchema"),
        },
      },
    },
    createUserHandler
  );

  server.post(
    "/login",
    {
      schema: {
        tags: ["Users"],
        body: $ref("loginSchema"),
        response: {
          200: $ref("loginResponseSchema"),
        },
      },
    },
    loginHandler
  );

  server.get(
    "/",
    {
      preHandler: [server.auth],
      schema: {
        tags: ["Users"],
      },
    },
    getUsersHandler
  );

  server.put(
    "/:id",
    {
      preHandler: [server.auth],
      schema: {
        tags: ["Users"],
        body: $ref("updateUserSchema"),
        response: {
          200: $ref("updateUserResponseSchema"),
        },
      },
    },
    updateUserHandler
  );

  server.delete(
    "/:id",
    { preHandler: [server.auth], schema: { tags: ["Users"] } },
    deleteUserHandler
  );
}

export default userRoutes;
