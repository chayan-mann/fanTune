/*
  Warnings:

  - The values [Credentials] on the enum `Provider` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `addedBy` on the `Stream` table. All the data in the column will be lost.
  - You are about to drop the column `bigImg` on the `Stream` table. All the data in the column will be lost.
  - You are about to drop the column `createAt` on the `Stream` table. All the data in the column will be lost.
  - You are about to drop the column `extractedId` on the `Stream` table. All the data in the column will be lost.
  - You are about to drop the column `played` on the `Stream` table. All the data in the column will be lost.
  - You are about to drop the column `playedTs` on the `Stream` table. All the data in the column will be lost.
  - You are about to drop the column `smallImg` on the `Stream` table. All the data in the column will be lost.
  - You are about to drop the column `spaceId` on the `Stream` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Stream` table. All the data in the column will be lost.
  - You are about to drop the column `url` on the `Stream` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `CurrentStream` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Space` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `role` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('Streamer', 'EndUser');

-- AlterEnum
BEGIN;
CREATE TYPE "Provider_new" AS ENUM ('Google');
ALTER TABLE "User" ALTER COLUMN "provider" TYPE "Provider_new" USING ("provider"::text::"Provider_new");
ALTER TYPE "Provider" RENAME TO "Provider_old";
ALTER TYPE "Provider_new" RENAME TO "Provider";
DROP TYPE "Provider_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "CurrentStream" DROP CONSTRAINT "CurrentStream_spaceId_fkey";

-- DropForeignKey
ALTER TABLE "CurrentStream" DROP CONSTRAINT "CurrentStream_streamId_fkey";

-- DropForeignKey
ALTER TABLE "Space" DROP CONSTRAINT "Space_hostId_fkey";

-- DropForeignKey
ALTER TABLE "Stream" DROP CONSTRAINT "Stream_addedBy_fkey";

-- DropForeignKey
ALTER TABLE "Stream" DROP CONSTRAINT "Stream_spaceId_fkey";

-- DropForeignKey
ALTER TABLE "Upvote" DROP CONSTRAINT "Upvote_streamId_fkey";

-- AlterTable
ALTER TABLE "Stream" DROP COLUMN "addedBy",
DROP COLUMN "bigImg",
DROP COLUMN "createAt",
DROP COLUMN "extractedId",
DROP COLUMN "played",
DROP COLUMN "playedTs",
DROP COLUMN "smallImg",
DROP COLUMN "spaceId",
DROP COLUMN "title",
DROP COLUMN "url";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "name",
DROP COLUMN "password",
ADD COLUMN     "role" "Role" NOT NULL;

-- DropTable
DROP TABLE "CurrentStream";

-- DropTable
DROP TABLE "Space";

-- AddForeignKey
ALTER TABLE "Upvote" ADD CONSTRAINT "Upvote_streamId_fkey" FOREIGN KEY ("streamId") REFERENCES "Stream"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
