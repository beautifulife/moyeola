import passport from 'passport';
import { Strategy, ExtractJwt, VerifyCallback } from 'passport-jwt';
import { Request, Response, NextFunction } from 'express';

import { prisma } from '../generated/prisma-client';

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

const verifyUser: VerifyCallback = async (payload, done) => {
  try {
    const user = await prisma.user({ id: payload.id });
    if (user !== null) {
      return done(null, { user, type: payload.type });
    } else {
      return done(null, false);
    }
  } catch (error) {
    return done(error, false);
  }
};

export const authenticateJwt = (req: Request, res: Response, next: NextFunction) =>
  passport.authenticate('jwt', { session: false }, (error, payload) => {
    if (payload) {
      req.user = {
        ...payload.user,
        type: payload.type,
      };
    }
    next();
  })(req, res, next);

passport.use(new Strategy(jwtOptions, verifyUser));
passport.initialize();
