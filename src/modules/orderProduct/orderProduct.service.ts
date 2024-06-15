import { prisma } from "../../database/prisma-client";
import { OrderProductInput } from "./orderProduct.schema";

export async function createOrderProduct(input: OrderProductInput) {
  const orderProduct = await prisma.orderProduct.create({
    data: input,
  });

  return orderProduct;
}

export async function findOrderProductes() {
  return prisma.orderProduct.findMany();
}

export async function findOrderProduct(id: number) {
  const orderProduct = await prisma.orderProduct.findUnique({
    where: {
      id,
    },
  });

  return orderProduct;
}

export async function updateOrderProduct({
  id,
  ...body
}: OrderProductInput & { id: number }) {
  const orderProduct = await prisma.orderProduct.update({
    where: {
      id,
    },
    data: body,
  });

  return orderProduct;
}

export async function deleteOrderProduct(id: number) {
  const orderProduct = await prisma.orderProduct.delete({
    where: {
      id,
    },
  });

  return orderProduct;
}
