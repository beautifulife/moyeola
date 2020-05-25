import { QueryResolvers } from '../../generated/graphql';

const hello: QueryResolvers['hello'] = (_, { name }) => `Hello ${name || 'World'}`;

export default {
  Query: {
    hello,
  },
};
