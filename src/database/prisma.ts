import { PrismaClient } from "../generated/prisma/client.js";
import { PrismaPg } from "@prisma/adapter-pg";

let client: PrismaClient | null = null;

export default function getPrisma(): PrismaClient {
  if (!client) {
    const adapter = new PrismaPg({
      connectionString: process.env.DATABASE_URL,
    });

    client = new PrismaClient({ adapter });
  }
  return client;
}
