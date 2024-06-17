import { prisma } from "../../database/prisma-client";
import { CategoryInput } from "./category.schema";

export async function createCategory(input: CategoryInput) {
  const category = await prisma.category.create({
    data: input,
  });

  return category;
}

export async function findCategories() {
  return prisma.category.findMany();
}

export async function findCategory(id: number) {
  const category = await prisma.category.findUnique({
    where: {
      id,
    },
    select: {
      name: true,
      description: true,
      product: {
        select: {
          name: true,
          price: true,
          image: true,
          id: true,
        },
      },
    },
  });

  return category;
}

export async function updateCategory({
  id,
  ...body
}: CategoryInput & { id: number }) {
  const address = await prisma.category.update({
    where: {
      id,
    },
    data: body,
  });

  return address;
}

export async function deleteCategory(id: number) {
  const category = await prisma.category.delete({
    where: {
      id,
    },
  });

  return category;
}
