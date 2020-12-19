import { Request, Response } from "express";
import session from "express-session";

export interface MyContext {
  req: Request;
  res: Response;
}

export interface AppContext {
  req: {
    session: {
      userId: string | number;
      destroy: (
        callback: (err: any) => void
      ) => session.Session & Partial<session.SessionData>;
    };
  };
  res: {
    clearCookie: (cookie: string) => void;
  };
}
