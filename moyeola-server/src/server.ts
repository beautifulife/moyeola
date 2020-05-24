import { GraphQLServer } from 'graphql-yoga';
import logger from 'morgan';

import schema from './schema';
import { prisma } from '../generated/prisma-client';
import { authenticateJwt } from './passport';
import isAuthenticated from './middlewares/isAuthenticated';

const PORT = process.env.PORT;

const server = new GraphQLServer({
  schema,
  context: ({ request }) => ({ request, prisma, isAuthenticated }),
});

server.express.use(logger('dev'));
server.express.use(authenticateJwt);

server.start({ port: PORT }, () => console.log(`Server is running on http://localhost:${PORT}`));
