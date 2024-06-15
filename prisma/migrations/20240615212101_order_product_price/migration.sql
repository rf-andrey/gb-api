/*
  Warnings:

  - You are about to drop the column `preco_produto_pedido` on the `produto_pedido` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "endereco" DROP CONSTRAINT "endereco_cliente_id_fkey";

-- DropForeignKey
ALTER TABLE "produto_pedido" DROP CONSTRAINT "produto_pedido_pedido_id_fkey";

-- AlterTable
ALTER TABLE "produto_pedido" DROP COLUMN "preco_produto_pedido";

-- AddForeignKey
ALTER TABLE "endereco" ADD CONSTRAINT "endereco_cliente_id_fkey" FOREIGN KEY ("cliente_id") REFERENCES "cliente"("cliente_id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "produto_pedido" ADD CONSTRAINT "produto_pedido_pedido_id_fkey" FOREIGN KEY ("pedido_id") REFERENCES "pedido"("pedido_id") ON DELETE CASCADE ON UPDATE NO ACTION;
