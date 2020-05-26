import { QueryResolvers } from '../../../generated/graphql';

const getFeed: QueryResolvers['getFeed'] = (_, __, { prisma, request, isAuthenticated }) => {
  isAuthenticated(request);
  const events = prisma.events({
    orderBy: 'createdAt_DESC',
  });

  return events;
};

export default {
  Query: {
    getFeed,
  },
};
