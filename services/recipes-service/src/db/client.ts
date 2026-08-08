import { neonConfig } from "@neondatabase/serverless";
import { PrismaNeon } from "@prisma/adapter-neon";
import ws from "ws";
import { PrismaClient } from "../generated/prisma/index.js";

// Neon talks over WebSocket; Node <22 has no global WebSocket to use.
neonConfig.webSocketConstructor = ws;

// Schema targeting is handled by `schemas`/`@@schema(...)` in schema.prisma
// (fully-qualified table names) — the old `?schema=recipes` connection-string
// param is Prisma-native-engine-only, and Neon's pooled endpoint rejects
// `search_path` as a startup parameter.
const adapter = new PrismaNeon({ connectionString: process.env.RECIPES_DATABASE_URL });

export const prisma = new PrismaClient({ adapter });
