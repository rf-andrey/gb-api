-- DropForeignKey
ALTER TABLE "pedido" DROP CONSTRAINT "pedido_cliente_id_fkey";

-- DropForeignKey
ALTER TABLE "produto" DROP CONSTRAINT "produto_categoria_id_fkey";

-- DropForeignKey
ALTER TABLE "produto_pedido" DROP CONSTRAINT "produto_pedido_pedido_id_fkey";

-- DropForeignKey
ALTER TABLE "produto_pedido" DROP CONSTRAINT "produto_pedido_produto_id_fkey";

-- AddForeignKey
ALTER TABLE "pedido" ADD CONSTRAINT "pedido_cliente_id_fkey" FOREIGN KEY ("cliente_id") REFERENCES "cliente"("cliente_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "produto" ADD CONSTRAINT "produto_categoria_id_fkey" FOREIGN KEY ("categoria_id") REFERENCES "categoria"("categoria_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "produto_pedido" ADD CONSTRAINT "produto_pedido_pedido_id_fkey" FOREIGN KEY ("pedido_id") REFERENCES "pedido"("pedido_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "produto_pedido" ADD CONSTRAINT "produto_pedido_produto_id_fkey" FOREIGN KEY ("produto_id") REFERENCES "produto"("produto_id") ON DELETE CASCADE ON UPDATE CASCADE;
