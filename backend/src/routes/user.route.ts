import { Request, Router } from "express";
import authMiddleware from "../middleware/auth.middleware";
import { config } from "dotenv";
import conf from "../config/config";
import roleMiddleWare from "../middleware/role.middleware";
import UserController from "../controllers/user.controller";

interface UserRequest extends Request {
  user?: any;
}

// Dotenv config
config();

// global constants
const userRoutes = Router();
const url = conf.USERS_URL;

/**
 * @swagger
 * /api/v1/user:
 * get:
 *  tag:
 *    - User
 *    summary: Get user data
 *    description: Get user data
 *    responces:
 *      200:
 *        description: Ckecks if user is authenticated
 */
userRoutes.get(`${url}/info`, authMiddleware, async (req: UserRequest, res) => {
  const userInfo = await UserController.getUserPersonalData(req.user.email);

  res.send({ message: "ok", userInfo });
});

userRoutes.get(
  `${url}/order`,
  authMiddleware,
  roleMiddleWare(["SHIPPER", "ADMIN"]),
  async (req: UserRequest, res) => {
    const userInfo = await UserController.getUserPersonalData(req.user.email);
    res.send({ message: "ok", userInfo });
  }
);

export default userRoutes;
