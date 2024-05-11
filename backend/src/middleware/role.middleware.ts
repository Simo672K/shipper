import { Request, Response, NextFunction } from "express";

function roleMiddleWare(roles: core.Role) {
  return function (req: Request, res: Response, next: NextFunction) {
    const user = req.user;
    if (!user || !roles.includes(user.role)) {
      return res.status(403).send("Unauthorized");
    }
    next();
  };
}

export default roleMiddleWare;
