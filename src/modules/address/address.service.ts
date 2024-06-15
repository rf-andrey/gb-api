import { prisma } from "../../database/prisma-client";
import { AddressInput } from "./address.schema";

export async function createAddress(input: AddressInput & { userId: number }) {
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

export async function updateAddress({
  id,
  ...body
}: AddressInput & { id: number }) {
  const address = await prisma.address.update({
    where: {
      id,
    },
    data: body,
  });

  return address;
}

export async function deleteAddress(id: number) {
  const address = await prisma.address.delete({
    where: {
      id,
    },
  });

  return address;
}
