-- DropForeignKey
ALTER TABLE "produto" DROP CONSTRAINT "produto_categoria_id_fkey";

-- DropForeignKey
ALTER TABLE "produto_pedido" DROP CONSTRAINT "produto_pedido_produto_id_fkey";

-- AddForeignKey
ALTER TABLE "produto" ADD CONSTRAINT "produto_categoria_id_fkey" FOREIGN KEY ("categoria_id") REFERENCES "categoria"("categoria_id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "produto_pedido" ADD CONSTRAINT "produto_pedido_produto_id_fkey" FOREIGN KEY ("produto_id") REFERENCES "produto"("produto_id") ON DELETE CASCADE ON UPDATE NO ACTION;
