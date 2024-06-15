import { prisma } from "../../database/prisma-client";
import { OrderInput } from "./order.schema";

export async function createOrder(input: OrderInput & { userId: number }) {
  const order = await prisma.order.create({
    data: input,
  });

  return order;
}

export async function findOrderes() {
  return prisma.order.findMany();
}

export async function findOrder(id: number) {
  const order = await prisma.order.findUnique({
    where: {
      id,
    },
  });

  return order;
}

export async function updateOrder({
  id,
  ...body
}: OrderInput & { id: number }) {
  const order = await prisma.order.update({
    where: {
      id,
    },
    data: body,
  });

  return order;
}

export async function deleteOrder(id: number) {
  const order = await prisma.order.delete({
    where: {
      id,
    },
  });

  return order;
}
