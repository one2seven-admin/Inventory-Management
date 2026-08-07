import dotenv from "dotenv";
import { fileURLToPath } from "node:url";

// Single root .env for the whole monorepo — no per-service .env files.
// Must be imported (not called as a statement) as the FIRST import in any
// entrypoint that also imports ./config.js — ES module import declarations
// evaluate in source order before the importing file's own statements run,
// so a plain `dotenv.config()` call placed after other imports would run
// too late to be visible to config.js's module-level `process.env` reads.
dotenv.config({ path: fileURLToPath(new URL("../../../.env", import.meta.url)) });
