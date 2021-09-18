-- AlterTable
ALTER TABLE "ProjectSetting" ADD COLUMN     "emailBody" TEXT,
ADD COLUMN     "emailEnabled" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "emailTitle" TEXT;
