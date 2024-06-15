import { prisma } from "../../database/prisma-client";
import { CreateUserInput } from "./user.schema";

export async function createUser(input: CreateUserInput) {
  const user = await prisma.user.create({
    data: input,
  });

  return user;
}

export async function findUserByUsername(username: string) {
  return prisma.user.findUnique({
    where: {
      username,
    },
  });
}
