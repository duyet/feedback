import { Invitation, Project, Prisma } from '@prisma/client';

export * from '@prisma/client';

// Advanced type safety
// https://www.prisma.io/docs/concepts/components/prisma-client/advanced-type-safety

const projectUserPopulated = Prisma.validator<Prisma.ProjectUserArgs>()({
  include: {
    project: true,
    user: true,
  },
});

export type ProjectUserPopulated = Prisma.ProjectUserGetPayload<
  typeof projectUserPopulated
>;

const projectUserSettingPopulated = Prisma.validator<Prisma.ProjectArgs>()({
  include: {
    users: true,
    setting: true,
  },
});

export type ProjectUserSettingPopulated = Prisma.ProjectGetPayload<
  typeof projectUserSettingPopulated
>;

export type InvitationWithProject = Invitation & {
  invitedToProject: Project;
};
