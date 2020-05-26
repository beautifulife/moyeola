import { GraphQLServer } from 'graphql-yoga';
import logger from 'morgan';
import { Request } from 'express';

import schema from './schema';
import { prisma, Prisma } from '../generated/prisma-client';
import { authenticateJwt } from './passport';
import isAuthenticated, { IsAuthenticated } from './middlewares/isAuthenticated';

const PORT = process.env.PORT;

export interface Context {
  request: Request;
  prisma: Prisma;
  isAuthenticated: IsAuthenticated;
}

interface ContextFunction {
  ({ request }: { request: Request }): Context;
}

const context: ContextFunction = ({ request }) => ({
  request,
  prisma,
  isAuthenticated,
});

const server = new GraphQLServer({
  schema,
  context,
});

server.express.use(logger('dev'));
server.express.use(authenticateJwt);

server.start({ port: PORT }, () => console.log(`Server is running on http://localhost:${PORT}`));
