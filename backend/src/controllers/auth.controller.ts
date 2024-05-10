import { PrismaSingleton } from "../lib/db";
import { PrismaClient } from "@prisma/client";
import { genrateAccessToken, refreshAccessToken } from "../utils/authUtils";
import bcrypt from "bcrypt";

class AuthController {
  private static prisma: PrismaClient = PrismaSingleton.getPrisma();

  private static async createJWTCredentials(
    name: string,
    email: string,
    role: string
  ) {
    try {
      const accessToken = genrateAccessToken(name, email, role);
      const refreshToken = refreshAccessToken(name, email, role);

      const isTokenStored = await this.prisma.token.create({
        data: {
          token: refreshToken,
        },
      });
      if (isTokenStored) return { accessToken, refreshToken };
      throw new Error("Internal error, Failed to store refresh token!");
    } catch (err) {
      console.log(err);
    }
  }

  static async refreshJWTCredetials(
    refreshToken: string,
    name: string,
    email: string,
    role: string
  ) {
    const accessToken = genrateAccessToken(name, email, role);
    return { accessToken, refreshToken };
  }

  static async authenticate(email: string, password: string) {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          email: email,
        },
        include: {
          Profile: {
            include: {
              Access: true,
            },
          },
        },
      });
      if (user) {
        const isLigit = await bcrypt.compare(password, user.hashedPassword);
        if (isLigit) {
          const jwtCredentials = this.createJWTCredentials(
            user.name,
            user.email,
            user.Profile.Access.role
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
