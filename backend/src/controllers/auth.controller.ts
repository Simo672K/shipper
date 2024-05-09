import { PrismaSingleton } from "../lib/db";
import { PrismaClient } from "@prisma/client";
import { genrateAccessToken, refreshAccessToken } from "../utils/authUtils";
import bcrypt from "bcrypt";

class AuthController {
  private static prisma: PrismaClient = PrismaSingleton.getPrisma();

  private static async createJWTCredentials(name: string, email: string) {
    const accessToken = genrateAccessToken(name, email);
    const refreshToken = refreshAccessToken(name, email);

    return { accessToken, refreshToken };
  }

  static async authenticate(email: string, password: string) {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          email: email,
        },
        select: { name: true, hashedPassword: true, email: true },
      });
      if (user) {
        const isLigit = await bcrypt.compare(password, user.hashedPassword);
        if (isLigit) {
          const jwtCredentials = this.createJWTCredentials(
            user.name,
            user.email
          );
          return [isLigit, jwtCredentials];
        }
      }
      return [false, null];
    } catch (err) {
      return [false, Error];
    }
  }

  static async register() {}
}

export default AuthController;
