import { EventResolvers } from '../../generated/graphql';

const Event: EventResolvers = {
  host: ({ id }, _, { prisma }) => prisma.event({ id }).host(),
  joinUsers: ({ id }, _, { prisma }) => prisma.event({ id }).joinUsers(),
  joinUsersCount: ({ id }, _, { prisma }) =>
    prisma
      .usersConnection({
        where: { events_some: { id } },
      })
      .aggregate()
      .count(),
  leftCount: async ({ id, limitCount }, _, { prisma }) =>
    limitCount -
    (await prisma
      .usersConnection({
        where: { events_some: { id } },
      })
      .aggregate()
      .count()),
  isFull: async ({ id, limitCount }, _, { prisma }) =>
    limitCount -
      (await prisma
        .usersConnection({
          where: { events_some: { id } },
        })
        .aggregate()
        .count()) ===
    0,
  tag: ({ id }, _, { prisma }) => prisma.event({ id }).tag(),
  likes: ({ id }, _, { prisma }) => prisma.event({ id }).likes(),
  likesCount: ({ id }, _, { prisma }) =>
    prisma
      .likesConnection({
        where: { event: { id } },
      })
      .aggregate()
      .count(),
  comments: ({ id }, _, { prisma }) => prisma.event({ id }).comments(),
  commentsCount: ({ id }, _, { prisma }) =>
    prisma
      .commentsConnection({
        where: { event: { id } },
      })
      .aggregate()
      .count(),
};

export default {
  Event,
};
