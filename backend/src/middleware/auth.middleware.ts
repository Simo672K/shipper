import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
interface RequestWithUser extends Request {
  user?: any;
}

function authMiddleware(
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN!, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

export default authMiddleware;
