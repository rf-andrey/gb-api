-- DropForeignKey
ALTER TABLE "pedido" DROP CONSTRAINT "pedido_cliente_id_fkey";

-- AddForeignKey
ALTER TABLE "pedido" ADD CONSTRAINT "pedido_cliente_id_fkey" FOREIGN KEY ("cliente_id") REFERENCES "cliente"("cliente_id") ON DELETE CASCADE ON UPDATE NO ACTION;
