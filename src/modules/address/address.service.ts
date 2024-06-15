import { prisma } from "../../database/prisma-client";
import { CreateAddressInput } from "./address.schema";

export async function createAddress(
  input: CreateAddressInput & { userId: number }
) {
  const address = await prisma.address.create({
    data: input,
  });

  return address;
}

export async function findAddresses() {
  return prisma.address.findMany();
}

export async function findAddress(id: number) {
  const address = await prisma.address.findUnique({
    where: {
      id,
    },
  });

  return address;
}
