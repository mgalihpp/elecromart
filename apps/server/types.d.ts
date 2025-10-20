declare namespace Express {
  interface Request {
    reqId?: string;
    user?: {
      id: string;
      email: string;
      name: string;
    };
  }
}
