/*
  Warnings:

  - You are about to drop the column `telefone` on the `cliente` table. All the data in the column will be lost.
  - You are about to drop the column `descricao_produto` on the `produto` table. All the data in the column will be lost.
  - You are about to drop the column `nome_produto` on the `produto` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "cliente" DROP COLUMN "telefone",
ADD COLUMN     "telephone" VARCHAR(11);

-- AlterTable
ALTER TABLE "produto" DROP COLUMN "descricao_produto",
DROP COLUMN "nome_produto",
ADD COLUMN     "descricao" VARCHAR(200),
ADD COLUMN     "productName" VARCHAR(50);
