import { PrismaSingleton } from "../lib/db";
import { PrismaClient } from "@prisma/client";

class UserController {
  private static prisma: PrismaClient = PrismaSingleton.getPrisma();

  private static async getUserAdress(userId: string) {
    const userAddressData = await this.prisma.address.findUnique({
      where: { userId },
      select: {
        name: true,
        street: true,
        postalCode: true,
        city: true,
      },
    });
    if (userAddressData) return userAddressData;
    throw new Error("Invalid id or user doesn't have address");
  }

  static async getUserPersonalData(id: string) {
    const userData = await this.prisma.user.findUnique({
      where: { id },
      select: {
        name: true,
        phoneNumber: true,
        email: true,
      },
    });
    const userAddress = await this.getUserAdress(id);
    if (userData) return { ...userData, addressInfo: userAddress };
    throw new Error("Invalid User Id");
  }
}
