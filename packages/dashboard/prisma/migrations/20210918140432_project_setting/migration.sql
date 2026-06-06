-- AlterTable
ALTER TABLE "ProjectSetting" ADD COLUMN     "slackChannel" TEXT,
ADD COLUMN     "slackEnabled" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "slackIcon" TEXT,
ADD COLUMN     "slackUserName" TEXT,
ADD COLUMN     "slackWebhook" TEXT,
ALTER COLUMN "plan" DROP NOT NULL;
