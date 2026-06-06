import { Invitation, Project, Prisma } from '@prisma/client';

export * from '@prisma/client';

// Advanced type safety
// https://www.prisma.io/docs/concepts/components/prisma-client/advanced-type-safety

const projectPopulated = Prisma.validator<Prisma.ProjectDefaultArgs>()({
  include: {
    users: true,
    setting: true,
    domains: true,
    _count: true
  },
});

export type ProjectPopulated = Prisma.ProjectGetPayload<
  typeof projectPopulated
>;

const projectUserPopulated = Prisma.validator<Prisma.ProjectUserDefaultArgs>()({
  include: {
    project: true,
    user: true,
  },
});

export type ProjectUserPopulated = Prisma.ProjectUserGetPayload<
  typeof projectUserPopulated
>;

const projectUserSettingPopulated = Prisma.validator<Prisma.ProjectDefaultArgs>()({
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

const domainPopulated = Prisma.validator<Prisma.DomainDefaultArgs>()({
  include: {
    project: true,
    _count: true,
  },
});

export type DomainPopulated = Prisma.DomainGetPayload<typeof domainPopulated>;

const formPopulated = Prisma.validator<Prisma.FormDefaultArgs>()({
  include: {
    _count: true,
  },
});

export type FormPopulated = Prisma.FormGetPayload<typeof formPopulated>;
