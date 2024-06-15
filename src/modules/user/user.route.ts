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
        body: $ref("loginSchema"),
        response: {
          200: $ref("loginResponseSchema"),
        },
      },
    },
    loginHandler
  );

  server.get("/", getUsersHandler);

  server.put(
    "/:id",
    {
      schema: {
        body: $ref("updateUserSchema"),
        response: {
          200: $ref("updateUserResponseSchema"),
        },
      },
    },
    updateUserHandler
  );

  server.delete("/:id", deleteUserHandler);
}

export default userRoutes;
