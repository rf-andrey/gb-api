import fastify, {
  FastifyInstance,
  FastifyReply,
  FastifyRequest,
} from "fastify";
import fastifyJwt from "@fastify/jwt";

import userRoutes from "./modules/user/user.route";
import { userSchemas } from "./modules/user/user.schema";
import { addressSchemas } from "./modules/address/address.schema";
import addressRoutes from "./modules/address/address.route";

declare module "fastify" {
  export interface FastifyInstance {
    auth: any;
  }
}

declare module "@fastify/jwt" {
  interface FastifyJWT {
    user: {
      id: number;
      email: string;
      username: string;
    };
  }
}

export const server: FastifyInstance = fastify();

server.register(fastifyJwt, {
  secret: process.env["JWT_SECRET"] ?? "",
});

server.decorate(
  "auth",
  async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      await request.jwtVerify();
    } catch (err) {
      return reply.send(err);
    }
  }
);

async function main() {
  for (const schema of [...userSchemas, ...addressSchemas]) {
    server.addSchema(schema);
  }

  server.register(userRoutes, { prefix: "api/users" });
  server.register(addressRoutes, { prefix: "api/addresses" });

  server.listen({ port: 3000 }, (err) => {
    if (err) {
      server.log.error(err);
      process.exit(1);
    }
    console.log("Server started at http://localhost:3000");
  });
}

main();
