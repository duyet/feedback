-- AlterTable
ALTER TABLE "Form" ADD COLUMN     "hasOtherChoice" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isMultipleChoice" BOOLEAN NOT NULL DEFAULT false;

-- RenameIndex
ALTER INDEX IF EXISTS "ProjectSetting_projectId_unique" RENAME TO "ProjectSetting_projectId_key";
