import { PrismaClient } from "@prisma/client";

export class PrismaSingleton {
  private static prisma: PrismaClient | null = null;

  private constructor() {}
  static getPrisma(): PrismaClient {
    if (!PrismaSingleton.prisma) {
      PrismaSingleton.prisma = new PrismaClient();
    }

    return PrismaSingleton.prisma;
  }
}
