import { QueryResolvers } from '../../../generated/graphql';

const getEvent: QueryResolvers['getEvent'] = (_, { id }, { prisma, isAuthenticated, request }) => {
  isAuthenticated(request);

  return prisma.event({ id });
};

export default {
  Query: {
    getEvent,
  },
};
