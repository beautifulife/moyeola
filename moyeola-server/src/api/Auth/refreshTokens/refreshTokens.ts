import { generateTokens } from '../../../utils';
import { QueryResolvers } from '../../../generated/graphql';

const refreshTokens: QueryResolvers['refreshTokens'] = (_, __, { request, isAuthenticated }) => {
  isAuthenticated(request, 'refreshToken');

  return generateTokens(request.user!.id);
};

export default {
  Query: {
    refreshTokens,
  },
};
