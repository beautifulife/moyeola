import { GraphQLServer } from 'graphql-yoga';
import logger from 'morgan';
import schema from './schema';

const PORT = process.env.PORT;
const typeDefs = `
  type Query {
    hello(name: String): String!
  }
`;

const resolvers = {
  Query: {
    hello: (_: null, { name }: { name: String }) => `Hello ${name || 'World'}`,
  },
};

const server = new GraphQLServer({ typeDefs, resolvers });

server.express.use(logger('dev'));

server.start({ port: PORT }, () => console.log(`Server is running on http://localhost:${PORT}`));
