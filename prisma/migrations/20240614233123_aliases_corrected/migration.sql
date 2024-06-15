/*
  Warnings:

  - You are about to drop the column `telephone` on the `cliente` table. All the data in the column will be lost.
  - You are about to drop the column `descricao` on the `produto` table. All the data in the column will be lost.
  - You are about to drop the column `productName` on the `produto` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "cliente" DROP COLUMN "telephone",
ADD COLUMN     "telefone" VARCHAR(11);

-- AlterTable
ALTER TABLE "produto" DROP COLUMN "descricao",
DROP COLUMN "productName",
ADD COLUMN     "descricao_produto" VARCHAR(200),
ADD COLUMN     "nome_produto" VARCHAR(50);
