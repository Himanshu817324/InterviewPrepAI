import { Request as ExpressRequest } from 'express';

declare global {
  namespace Express {
    export interface Request extends ExpressRequest {
      user?: {
        id: string;
        email: string;
      };
    }
  }
}
