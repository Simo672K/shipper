import { Router } from "express";
import { PrismaSingleton } from "../lib/db";
import { config } from "dotenv";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import conf from "../config/config";
import AuthController from "../controllers/auth.controller";

// Dotenv config
config();

// global constants
const authRouter = Router();
const url = conf.AUTH_URL;
const prisma = PrismaSingleton.getPrisma();

authRouter.post(`${url}/login`, async (req, res) => {
  const { email, password } = req.body;
  const [done, token] = await AuthController.authenticate(email, password);
  if (done) return res.send(await token);

  switch (token) {
    case null:
      res.status(401).send({ message: "Invalid credentials" });
      break;
    default:
      res.status(500).send();
      break;
  }
  // try {
  //   const user = await prisma.user.findUnique({
  //     where: {
  //       email: email,
  //     },
  //     select: { name: true, hashedPassword: true, email: true },
  //   });
  //   if (user) {
  //     const isLigit = await bcrypt.compare(password, user.hashedPassword);
  //     if (isLigit) {
  //       const accessToken = jwt.sign(
  //         { name: user.name, email: user.email },
  //         process.env.ACCESS_TOKEN!
  //       );
  //       res.send({ accessToken });
  //     }
  //   }
  //   res.status(401).send({ message: "Failed to authenticate" });
  // } catch (err) {
  //   res.status(500).send();
  // }
});

authRouter.post(`${url}/register`, async (req, res) => {
  const { name, email, phoneNumber, password, isActive, lastLogin } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        phoneNumber,
        hashedPassword,
        isActive,
        lastLogin,
        verified: false,
      },
    });
    if (newUser) res.status(201).send({ message: "User created successfully" });
    else throw new Error();
  } catch (err) {
    res.status(500).send();
    console.log(err);
  }
});

export default authRouter;
