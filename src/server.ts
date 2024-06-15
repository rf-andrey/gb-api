import fastify, { FastifyInstance } from "fastify";

const server: FastifyInstance = fastify();

function main() {
  server.listen({ port: 3000 }, () =>
    console.log("Server started at http://localhost:3000")
  );
}

main();
