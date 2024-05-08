import { Request, Router } from "express";
import authMiddleware from "../middleware/auth.middleware";
import { PrismaSingleton } from "../lib/db";
import { config } from "dotenv";
import conf from "../config/config";

// Dotenv config
config();

// global constants
const userRouter = Router();
const url = conf.USERS_URL;
const prisma = PrismaSingleton.getPrisma();

userRouter.get(url, authMiddleware, (req: Request & { user?: any }, res) => {
  res.send({ message: "ok", user: req.user });
});

export default userRouter;
