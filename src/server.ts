import fastify, { FastifyInstance } from "fastify";

import userRoutes from "./modules/user/user.route";
import { userSchemas } from "./modules/user/user.schema";

const server: FastifyInstance = fastify();

async function main() {
  for (const schema of userSchemas) {
    server.addSchema(schema);
  }

  server.register(userRoutes, { prefix: "api/users" });

  server.listen({ port: 3000 }, (err) => {
    if (err) {
      server.log.error(err);
      process.exit(1);
    }
    console.log("Server started at http://localhost:3000");
  });
}

main();
