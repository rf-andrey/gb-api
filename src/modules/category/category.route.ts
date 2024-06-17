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
      schema: {
        tags: ["Categories"],
      },
    },
    createCategoryHandler
  );

  server.get(
    "/",
    {
      schema: {
        tags: ["Categories"],
      },
    },
    getCategoriesHandler
  );

  server.get(
    "/:id",
    {
      schema: {
        tags: ["Categories"],
      },
    },
    getCategoryByIdHandler
  );

  server.put(
    "/:id",
    {
      preHandler: [server.auth],
      schema: {
        tags: ["Categories"],
        body: $ref("categorySchema"),
        response: {
          200: $ref("categoryResponseSchema"),
        },
      },
    },
    updateCategoryHandler
  );

  server.delete(
    "/:id",
    {
      preHandler: [server.auth],
      schema: {
        tags: ["Categories"],
      },
    },
    deleteCategoryHandler
  );
}

export default categoryRoutes;
