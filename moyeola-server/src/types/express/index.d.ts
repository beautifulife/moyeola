import { Express } from 'express';

interface CustomUser {
  id: string;
  type: string;
}

declare global {
  namespace Express {
    export interface User extends CustomUser {}
  }
}
