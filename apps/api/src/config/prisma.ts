import "dotenv/config";
import * as Prisma from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";

const PrismaClient = (Prisma as any).PrismaClient ?? (Prisma as any).default;
const { Pool } = pg;


const REQUIRED_ENV = ["DATABASE_URL", "JWT_SECRET", "REFRESH_TOKEN_SECRET"];
REQUIRED_ENV.forEach((key) => {
  if (!process.env[key]) {
    throw new Error(`Critical Error: ${key} is not defined in .env`);
  }
});


const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
export const prisma = new PrismaClient({ adapter });

export const config = {
  JWT_SECRET: process.env.JWT_SECRET!,
  REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET!,
  PORT: process.env.PORT || 5000,
  DATABASE_URL: process.env.DATABASE_URL!,
};


export async function connectDB(): Promise<void> {
  try {
    await prisma.$connect();
    console.log("Database connected successfully");
  } catch (error) {
    console.error(
      "Database connection failed:",
      (error as Error).message
    );
    process.exit(1);
  }
}
