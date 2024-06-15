/*
  Warnings:

  - You are about to drop the `_AddressToCustomer` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_AddressToCustomer" DROP CONSTRAINT "_AddressToCustomer_A_fkey";

-- DropForeignKey
ALTER TABLE "_AddressToCustomer" DROP CONSTRAINT "_AddressToCustomer_B_fkey";

-- DropTable
DROP TABLE "_AddressToCustomer";

-- AddForeignKey
ALTER TABLE "cliente" ADD CONSTRAINT "cliente_endereco_id_fkey" FOREIGN KEY ("endereco_id") REFERENCES "endereco"("endereco_id") ON DELETE NO ACTION ON UPDATE NO ACTION;
