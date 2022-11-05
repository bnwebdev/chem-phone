import { Request, Response } from 'express';

export type AppGraphhQLContext<Req = Request, Res = Response> = {
  req: Req;
  res: Res;
};
