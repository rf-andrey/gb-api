/*
  Warnings:

  - You are about to drop the column `endereco_id` on the `cliente` table. All the data in the column will be lost.
  - Added the required column `cliente_id` to the `endereco` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "cliente" DROP CONSTRAINT "cliente_endereco_id_fkey";

-- AlterTable
ALTER TABLE "cliente" DROP COLUMN "endereco_id";

-- AlterTable
ALTER TABLE "endereco" ADD COLUMN     "cliente_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "endereco" ADD CONSTRAINT "endereco_cliente_id_fkey" FOREIGN KEY ("cliente_id") REFERENCES "cliente"("cliente_id") ON DELETE NO ACTION ON UPDATE NO ACTION;
