import { PrismaSingleton } from "../lib/db";
import { PrismaClient } from "@prisma/client";

class UserController {
  private static prisma: PrismaClient = PrismaSingleton.getPrisma();

  static async getUserPersonalData(email: string) {
    const userData = await this.prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        name: true,
        phoneNumber: true,
        email: true,
        address: true,
      },
    });
    if (userData) return userData;
    throw new Error("Invalid User Id");
  }

  static async getUserOrders(email: string) {}
}

export default UserController;
