/*
  Warnings:

  - You are about to drop the column `questionId` on the `Option` table. All the data in the column will be lost.
  - You are about to drop the column `end_date` on the `Poll` table. All the data in the column will be lost.
  - You are about to drop the column `start_date` on the `Poll` table. All the data in the column will be lost.
  - You are about to drop the column `questionId` on the `Vote` table. All the data in the column will be lost.
  - You are about to drop the `Question` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `pollId` to the `Option` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Option" DROP CONSTRAINT "Option_questionId_fkey";

-- DropForeignKey
ALTER TABLE "Question" DROP CONSTRAINT "Question_pollId_fkey";

-- DropForeignKey
ALTER TABLE "Vote" DROP CONSTRAINT "Vote_questionId_fkey";

-- AlterTable
ALTER TABLE "Option" DROP COLUMN "questionId",
ADD COLUMN     "pollId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Poll" DROP COLUMN "end_date",
DROP COLUMN "start_date";

-- AlterTable
ALTER TABLE "Vote" DROP COLUMN "questionId";

-- DropTable
DROP TABLE "Question";

-- AddForeignKey
ALTER TABLE "Option" ADD CONSTRAINT "Option_pollId_fkey" FOREIGN KEY ("pollId") REFERENCES "Poll"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
