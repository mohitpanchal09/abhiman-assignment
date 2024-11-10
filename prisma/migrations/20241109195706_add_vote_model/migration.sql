/*
  Warnings:

  - You are about to drop the column `category` on the `Poll` table. All the data in the column will be lost.
  - You are about to drop the column `max_reward` on the `Poll` table. All the data in the column will be lost.
  - You are about to drop the column `min_reward` on the `Poll` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Poll" DROP COLUMN "category",
DROP COLUMN "max_reward",
DROP COLUMN "min_reward";
