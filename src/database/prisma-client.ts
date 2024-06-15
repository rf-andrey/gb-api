import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

export const prisma = new PrismaClient().$extends({
  query: {
    customer: {
      $allOperations({ operation, args, query }) {
        if (
          (operation === "create" || operation === "update") &&
          args.data["password"] &&
          typeof args.data["password"] === "string"
        ) {
          args.data["password"] = bcrypt.hashSync(args.data["password"], 10);
        }
        return query(args);
      },
    },
  },
});
