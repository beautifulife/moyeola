import { MutationResolvers } from '../../../generated/graphql';

const createEvent: MutationResolvers['createEvent'] = async (
  _,
  args,
  { prisma, isAuthenticated, request },
) => {
  isAuthenticated(request);

  const userId = request.user!.id;
  const { name, location, limitCount, tag } = args;

  const { id: tagId } = await prisma.upsertTag({
    where: { name: tag },
    update: { name: tag },
    create: { name: tag },
  });

  return prisma.createEvent({
    name,
    location,
    limitCount,
    host: {
      connect: {
        id: userId,
      },
    },
    joinUsers: {
      connect: {
        id: userId,
      },
    },
    tag: {
      connect: {
        id: tagId,
      },
    },
  });
};

export default {
  Mutation: {
    createEvent,
  },
};
