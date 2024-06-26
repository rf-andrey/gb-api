import fastify, {
  FastifyInstance,
  FastifyReply,
  FastifyRequest,
} from "fastify";
import fastifyJwt from "@fastify/jwt";
import swagger from "@fastify/swagger";
import swaggerUI from "@fastify/swagger-ui";
import { withRefResolver } from "fastify-zod";
import cors from "@fastify/cors";

import { userSchemas } from "./modules/user/user.schema";
import { addressSchemas } from "./modules/address/address.schema";
import { categorySchemas } from "./modules/category/category.schema";
import { productSchemas } from "./modules/product/product.schema";
import { orderSchemas } from "./modules/order/order.schema";
import { orderProductSchemas } from "./modules/orderProduct/orderProduct.schema";

import userRoutes from "./modules/user/user.route";
import addressRoutes from "./modules/address/address.route";
import categoryRoutes from "./modules/category/category.route";
import productRoutes from "./modules/product/product.route";
import orderRoutes from "./modules/order/order.route";
import orderProductRoutes from "./modules/orderProduct/orderProduct.route";

import { version } from "../package.json";

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

await server.register(cors, {
  origin: true,
  allowedHeaders: [
    "Origin",
    "X-Requested-With",
    "Accept",
    "Content-Type",
    "Authorization",
  ],
  methods: ["GET", "PUT", "PATCH", "POST", "DELETE", "OPTIONS"],
});

server.register(
  swagger,
  withRefResolver({
    openapi: {
      info: {
        title: "GB API",
        description: "",
        version,
      },
    },
  })
);
server.register(swaggerUI, {
  routePrefix: "/swagger",
  staticCSP: true,
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
  for (const schema of [
    ...userSchemas,
    ...addressSchemas,
    ...categorySchemas,
    ...productSchemas,
    ...orderSchemas,
    ...orderProductSchemas,
  ]) {
    server.addSchema(schema);
  }

  server.register(userRoutes, { prefix: "api/users" });
  server.register(addressRoutes, { prefix: "api/addresses" });
  server.register(categoryRoutes, { prefix: "api/categories" });
  server.register(productRoutes, { prefix: "api/products" });
  server.register(orderRoutes, { prefix: "api/orders" });
  server.register(orderProductRoutes, { prefix: "api/orderProducts" });

  server.listen({ port: 3333 }, (err) => {
    if (err) {
      server.log.error(err);
      process.exit(1);
    }
    console.log("Server started at http://localhost:3333");
  });
}

main();
