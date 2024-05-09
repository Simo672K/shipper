import { Request, Response, NextFunction } from "express";

function loggingMiddleware(
  req: Request & { user?: any },
  res: Response,
  next: NextFunction
) {
  console.log(`${req.method} ${req.url}`);
  next();
}

export default loggingMiddleware;
