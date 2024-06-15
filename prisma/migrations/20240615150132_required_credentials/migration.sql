/*
  Warnings:

  - Made the column `email` on table `cliente` required. This step will fail if there are existing NULL values in that column.
  - Made the column `username` on table `cliente` required. This step will fail if there are existing NULL values in that column.
  - Made the column `senha` on table `cliente` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "cliente" ALTER COLUMN "email" SET NOT NULL,
ALTER COLUMN "username" SET NOT NULL,
ALTER COLUMN "senha" SET NOT NULL;
