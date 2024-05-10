import { PrismaSingleton } from "../lib/db";

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

const profiles = [
  {
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
  await prisma.access.createMany({ data: access });
  await prisma.profile.createMany({ data: profiles });
  console.log("[*] Access data seeded successfully!");
  console.log("[*] Profiles data seeded successfully!");
}

seed();
