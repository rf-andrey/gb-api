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
