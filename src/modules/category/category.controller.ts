import { FastifyReply, FastifyRequest } from "fastify";
import { CategoryInput } from "./category.schema";
import {
  createCategory,
  deleteCategory,
  findCategories,
  findCategory,
  updateCategory,
} from "./category.service";

export async function createCategoryHandler(
  request: FastifyRequest<{ Body: CategoryInput }>,
  reply: FastifyReply
) {
  const { body } = request;

  try {
    const category = await createCategory(body);

    return reply.code(201).send(category);
  } catch (err) {
    console.error(err);
    return reply.code(500).send(err);
  }
}

export async function getCategoriesHandler() {
  const categories = await findCategories();

  return categories;
}

export async function getCategoryByIdHandler(
  request: FastifyRequest<{ Params: { id: string } }>
) {
  const {
    params: { id },
  } = request;

  const requestId = parseInt(id);

  const category = await findCategory(requestId);

  return category;
}

export async function updateCategoryHandler(
  request: FastifyRequest<{ Body: CategoryInput; Params: { id: string } }>,
  reply: FastifyReply
) {
  try {
    const {
      body,
      params: { id },
    } = request;

    const requestId = parseInt(id);

    const category = await updateCategory({ id: requestId, ...body });

    return reply.code(200).send(category);
  } catch (err) {
    console.error(err);
    return reply.code(500).send(err);
  }
}

export async function deleteCategoryHandler(
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) {
  const {
    params: { id },
  } = request;

  const requestId = parseInt(id);

  const category = await deleteCategory(requestId);

  return reply.code(200).send(category);
}
