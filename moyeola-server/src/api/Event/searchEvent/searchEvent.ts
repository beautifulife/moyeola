import { QueryResolvers } from '../../../generated/graphql';

const searchEvent: QueryResolvers['searchEvent'] = (
  _,
  { keyword },
  { prisma, isAuthenticated, request },
) => {
  isAuthenticated(request);

  return prisma.events({
    where: {
      OR: [
        { name_contains: keyword },
        {
          tag: {
            name_contains: keyword,
          },
        },
      ],
    },
  });
};

export default {
  Query: {
    searchEvent,
  },
};
