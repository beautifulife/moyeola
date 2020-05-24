import { Request } from 'express';

interface AuthRequest extends Request {
  user?: string;
}

export default (request: AuthRequest) => {
  if (!request.user) {
    throw Error('You need to log-in to perform this action');
  }
  return;
};
