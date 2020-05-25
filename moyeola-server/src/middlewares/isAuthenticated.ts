import { Request } from 'express';

const isAuthenticated = (request: Request, type: string = 'accessToken') => {
  if (!request.user) {
    throw Error('You need to log-in to perform this action');
  }

  if (request.user.type !== type) {
    throw Error('You need to use right token to perform this action');
  }
  return;
};

export type IsAuthenticated = typeof isAuthenticated;

export default isAuthenticated;
