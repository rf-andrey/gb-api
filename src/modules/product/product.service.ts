import { prisma } from "../../database/prisma-client";
import { ProductInput } from "./product.schema";

export async function createProduct(input: ProductInput) {
  const product = await prisma.product.create({
    data: input,
  });

  return product;
}

export async function findProducts() {
  return prisma.product.findMany();
}

export async function findProduct(id: number) {
  const product = await prisma.product.findUnique({
    where: {
      id,
    },
  });

  return product;
}

export async function updateProduct({
  id,
  ...body
}: ProductInput & { id: number }) {
  const product = await prisma.product.update({
    where: {
      id,
    },
    data: body,
  });

  return product;
}

export async function deleteProduct(id: number) {
  const product = await prisma.product.delete({
    where: {
      id,
    },
  });

  return product;
}
