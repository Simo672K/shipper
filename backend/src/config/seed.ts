import { PrismaSingleton } from "../lib/db";
import { config } from "dotenv";

config();
const prisma = PrismaSingleton.getPrisma();

interface AccessType {
  id: string;
  role: "ADMIN" | "DISPATCHER" | "DRIVER" | "SHIPPER";
}

const access: Array<AccessType> = [
  {
    id: "adc563d4-369c-4bf3-9b35-d20c669c04b7",
    role: "ADMIN",
  },
  {
    id: "4bb56bb8-2db1-4e1d-9926-5d88cab902bc",
    role: "DISPATCHER",
  },
  {
    id: "fda60a7e-8998-450a-822d-86508bc8e4f5",
    role: "DRIVER",
  },
  {
    id: "0b630a14-ba5b-4c68-9c39-e2d7984325ce",
    role: "SHIPPER",
  },
];

const adminData = {
  name: "Admin User",
  email: "test@email.com",
  phoneNumber: "phone",
  profileId: "865b2393-55c0-453f-a2b2-f13cdf3f4ab3",
  hashedPassword:
    "$2b$10$vb5v.PuO1zsKIIw2LPO5uukeaI8yteLHoQ4XRx/WBRoU5U3QDrSs6",
  verified: true,
  isActive: true,
  lastLogin: "2024-05-08T18:41:12Z",
};

const profiles = [
  {
    id: "865b2393-55c0-453f-a2b2-f13cdf3f4ab3",
    name: "admin",
    role_id: "adc563d4-369c-4bf3-9b35-d20c669c04b7",
  },
  {
    name: "dispatcher",
    role_id: "4bb56bb8-2db1-4e1d-9926-5d88cab902bc",
  },
  {
    name: "driver",
    role_id: "fda60a7e-8998-450a-822d-86508bc8e4f5",
  },
  {
    name: "shipper",
    role_id: "0b630a14-ba5b-4c68-9c39-e2d7984325ce",
  },
];
async function seed() {
  try {
    await prisma.access.createMany({ data: access });
    await prisma.profile.createMany({ data: profiles });
    await prisma.user.create({ data: adminData });
    console.log("[*] Access data seeded successfully!");
    console.log("[*] Profiles data seeded successfully!");
    console.log("[*] Admin data seeded successfully!");
  } catch (err) {
    console.error(err);
  }
}

seed().then(async () => await prisma.$disconnect());
