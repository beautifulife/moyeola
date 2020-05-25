import { Prisma } from '../../../../generated/prisma-client';
import { generateTokens } from '../../../utils';
import { MutationResolvers } from '../../../generated/graphql';

const login: MutationResolvers['login'] = async (_, args, { prisma }: { prisma: Prisma }) => {
  let user = await prisma.user({ email: args.email });
  if (!user?.email) {
    user = await prisma.createUser({
      userName: args.email,
      email: args.email,
      reputation: 36.5,
    });
  }
  return generateTokens(user.id);
};

export default {
  Mutation: {
    login,
  },
};
