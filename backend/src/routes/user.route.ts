import { Request, Router } from "express";
import authMiddleware from "../middleware/auth.middleware";
import { config } from "dotenv";
import conf from "../config/config";
import roleMiddleWare from "../middleware/role.middleware";

interface UserRequest extends Request {
  user?: any;
}

// Dotenv config
config();

// global constants
const userRoutes = Router();
const url = conf.USERS_URL;

userRoutes.get(url, authMiddleware, (req: UserRequest, res) => {
  res.send({ message: "ok", user: req.user });
});

userRoutes.get(
  `${url}/order`,
  authMiddleware,
  roleMiddleWare(["SHIPPER"]),
  (req: UserRequest, res) => {
    res.send({ message: "ok", user: req.user });
  }
);

export default userRoutes;
