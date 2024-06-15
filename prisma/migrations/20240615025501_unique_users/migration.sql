/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `cliente` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[username]` on the table `cliente` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateTable
CREATE TABLE "_AddressToCustomer" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_AddressToCustomer_AB_unique" ON "_AddressToCustomer"("A", "B");

-- CreateIndex
CREATE INDEX "_AddressToCustomer_B_index" ON "_AddressToCustomer"("B");

-- CreateIndex
CREATE UNIQUE INDEX "cliente_email_key" ON "cliente"("email");

-- CreateIndex
CREATE UNIQUE INDEX "cliente_username_key" ON "cliente"("username");

-- AddForeignKey
ALTER TABLE "_AddressToCustomer" ADD CONSTRAINT "_AddressToCustomer_A_fkey" FOREIGN KEY ("A") REFERENCES "endereco"("endereco_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AddressToCustomer" ADD CONSTRAINT "_AddressToCustomer_B_fkey" FOREIGN KEY ("B") REFERENCES "cliente"("cliente_id") ON DELETE CASCADE ON UPDATE CASCADE;
