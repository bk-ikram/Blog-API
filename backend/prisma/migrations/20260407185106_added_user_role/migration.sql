-- CreateEnum
CREATE TYPE "Role" AS ENUM ('AUTHOR', 'READER');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'READER';
