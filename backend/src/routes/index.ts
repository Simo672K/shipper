import { Router } from "express";
import authRouter from "./auth.route";
import userRouter from "./user.route";

const router = Router();
router.use(authRouter, userRouter);

export default router;
