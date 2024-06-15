import { prisma } from "../../database/prisma-client";
import { CreateUserInput, UpdateUserInput } from "./user.schema";

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

export async function findUsers() {
  return prisma.user.findMany({
    select: {
      email: true,
      name: true,
      id: true,
      cpf: true,
      telephone: true,
      birthDate: true,
    },
  });
}

export async function updateUser({
  id,
  telephone,
  password,
}: UpdateUserInput & { id: number }) {
  const user = await prisma.user.update({
    where: {
      id,
    },
    data: {
      telephone,
      password,
    },
  });

  return user;
}

export async function deleteUser(id: number) {
  const user = await prisma.user.delete({
    where: {
      id,
    },
  });

  return user;
}
