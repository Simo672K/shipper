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
const authRoutes = Router();
const url = conf.AUTH_URL;
const prisma = PrismaSingleton.getPrisma();

authRoutes.post(`${url}/login`, async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).send({ message: "All fields are required" });
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
});

authRoutes.post(`${url}/register`, async (req, res) => {
  const { name, email, phoneNumber, password, isActive, lastLogin, profileId } =
    req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        phoneNumber,
        hashedPassword,
        isActive,
        profileId,
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

authRoutes.post(`${url}/refresh-token`, async (req, res) => {
  const { refreshToken } = req.body;
  try {
    const isValidToken = await prisma.token.findUnique({
      where: { token: refreshToken },
      select: { token: true, expired: true },
    });
    if (isValidToken) {
      jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN!,
        async (err: any, user: any) => {
          if (err) return res.sendStatus(403);
          const newCredentials = await AuthController.refreshJWTCredetials(
            refreshToken,
            user.name,
            user.email,
            user.role
          );
          res.status(200).send(newCredentials);
        }
      );
    }
  } catch (err) {}
});

authRoutes.get(`${url}/refresh-token`, () => {});

export default authRoutes;
