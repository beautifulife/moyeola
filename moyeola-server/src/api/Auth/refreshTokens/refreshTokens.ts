import { generateTokens } from '../../../utils';
import { QueryResolvers } from '../../../generated/graphql';
import { Request } from 'express';
import { IsAuthenticated } from '../../../middlewares/isAuthenticated';

const refreshTokens: QueryResolvers['refreshTokens'] = (
  _,
  __,
  { request, isAuthenticated }: { request: Request; isAuthenticated: IsAuthenticated },
) => {
  isAuthenticated(request, 'refreshToken');

  return generateTokens(request.user!.id);
};

export default {
  Query: {
    refreshTokens,
  },
};
