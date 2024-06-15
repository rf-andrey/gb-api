import { prisma } from "../../database/prisma-client";
import { CreateCustomerInput } from "./customer.schema";

export async function createCustomer(input: CreateCustomerInput) {
  const customer = await prisma.customer.create({
    data: input,
  });

  return customer;
}
