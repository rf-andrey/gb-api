import fastify, { FastifyInstance } from "fastify";

import customerRoutes from "./modules/customer/customer.route";
import { customerSchemas } from "./modules/customer/customer.schema";

const server: FastifyInstance = fastify();

async function main() {
  for (const schema of customerSchemas) {
    server.addSchema(schema);
  }

  server.register(customerRoutes, { prefix: "api/customers" });

  server.listen({ port: 3000 }, (err) => {
    if (err) {
      server.log.error(err);
      process.exit(1);
    }
    console.log("Server started at http://localhost:3000");
  });
}

main();
