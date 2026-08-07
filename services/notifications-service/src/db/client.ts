import { Pool, neonConfig } from "@neondatabase/serverless";
import { PrismaNeon } from "@prisma/adapter-neon";
import ws from "ws";
import { PrismaClient } from "../generated/prisma/index.js";

// The default native query engine loads a binary via code that isn't
// bundler-safe (breaks with "__dirname is not defined" under Vercel's
// Node.js Function bundler). Neon's driver adapter queries over
// WebSocket/HTTP instead, so there's no native engine to load.
neonConfig.webSocketConstructor = ws;

// The `?schema=notifications` query param on the connection string is a
// Prisma-native-engine-only convention the driver adapter ignores, and
// Neon's pooled endpoint rejects `search_path` as a startup parameter — so
// schema targeting is handled by the `multiSchema` feature + `@@schema(...)`
// on every model in schema.prisma instead (fully-qualified table names,
// works through the pooler with no session-level state needed).
const pool = new Pool({ connectionString: process.env.NOTIFICATIONS_DATABASE_URL });
const adapter = new PrismaNeon(pool);

export const prisma = new PrismaClient({ adapter });
