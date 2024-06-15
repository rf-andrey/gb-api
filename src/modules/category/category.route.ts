import { FastifyInstance } from "fastify";

import {
  createCategoryHandler,
  deleteCategoryHandler,
  getCategoriesHandler,
  getCategoryByIdHandler,
  updateCategoryHandler,
} from "./category.controller";
import { $ref } from "./category.schema";

async function categoryRoutes(server: FastifyInstance) {
  server.post(
    "/",
    {
      preHandler: [server.auth],
    },
    createCategoryHandler
  );

  server.get("/", { preHandler: [server.auth] }, getCategoriesHandler);

  server.get("/:id", { preHandler: [server.auth] }, getCategoryByIdHandler);

  server.put(
    "/:id",
    {
      preHandler: [server.auth],
      schema: {
        body: $ref("categorySchema"),
        response: {
          200: $ref("categoryResponseSchema"),
        },
      },
    },
    updateCategoryHandler
  );

  server.delete("/:id", deleteCategoryHandler);
}

export default categoryRoutes;
