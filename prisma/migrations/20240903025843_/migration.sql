/*
  Warnings:

  - Made the column `image` on table `PostImage` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "PostImage" ALTER COLUMN "image" SET NOT NULL;
