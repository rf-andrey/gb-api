-- CreateTable
CREATE TABLE "categoria" (
    "categoria_id" SERIAL NOT NULL,
    "nome_categoria" VARCHAR(20),
    "descricao_categoria" VARCHAR(200),

    CONSTRAINT "categoria_pkey" PRIMARY KEY ("categoria_id")
);

-- CreateTable
CREATE TABLE "cliente" (
    "cliente_id" SERIAL NOT NULL,
    "email" VARCHAR(50),
    "username" VARCHAR(15),
    "senha" VARCHAR(20),
    "nome" VARCHAR(200),
    "cpf" VARCHAR(11) NOT NULL,
    "telefone" VARCHAR(11),
    "data_nascimento" DATE,
    "endereco_id" INTEGER NOT NULL,

    CONSTRAINT "cliente_pkey" PRIMARY KEY ("cliente_id")
);

-- CreateTable
CREATE TABLE "endereco" (
    "endereco_id" SERIAL NOT NULL,
    "cep" VARCHAR(9),
    "rua" VARCHAR(100),
    "bairro" VARCHAR(30),
    "cidade" VARCHAR(30),
    "numero" VARCHAR(10),
    "complemento" VARCHAR(100),
    "uf" VARCHAR(2),

    CONSTRAINT "endereco_pkey" PRIMARY KEY ("endereco_id")
);

-- CreateTable
CREATE TABLE "pedido" (
    "pedido_id" SERIAL NOT NULL,
    "numero_pedido" INTEGER,
    "valor_total_pedido" DECIMAL,
    "data_pedido" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" BOOLEAN,
    "cliente_id" INTEGER NOT NULL,

    CONSTRAINT "pedido_pkey" PRIMARY KEY ("pedido_id")
);

-- CreateTable
CREATE TABLE "produto" (
    "produto_id" SERIAL NOT NULL,
    "nome_produto" VARCHAR(50),
    "descricao_produto" VARCHAR(200),
    "preco_produto" DECIMAL,
    "qtd_estoque" INTEGER,
    "data_cadastro_produto" DATE DEFAULT CURRENT_TIMESTAMP,
    "categoria_id" INTEGER NOT NULL,
    "imagem" VARCHAR,

    CONSTRAINT "produto_pkey" PRIMARY KEY ("produto_id")
);

-- CreateTable
CREATE TABLE "produto_pedido" (
    "produto_pedido_id" SERIAL NOT NULL,
    "qtd_produto_pedido" INTEGER,
    "preco_produto_pedido" DECIMAL,
    "produto_id" INTEGER,
    "pedido_id" INTEGER,

    CONSTRAINT "produto_pedido_pkey" PRIMARY KEY ("produto_pedido_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "cliente_cpf_key" ON "cliente"("cpf");

-- AddForeignKey
ALTER TABLE "pedido" ADD CONSTRAINT "pedido_cliente_id_fkey" FOREIGN KEY ("cliente_id") REFERENCES "cliente"("cliente_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "produto" ADD CONSTRAINT "produto_categoria_id_fkey" FOREIGN KEY ("categoria_id") REFERENCES "categoria"("categoria_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "produto_pedido" ADD CONSTRAINT "produto_pedido_pedido_id_fkey" FOREIGN KEY ("pedido_id") REFERENCES "pedido"("pedido_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "produto_pedido" ADD CONSTRAINT "produto_pedido_produto_id_fkey" FOREIGN KEY ("produto_id") REFERENCES "produto"("produto_id") ON DELETE NO ACTION ON UPDATE NO ACTION;
