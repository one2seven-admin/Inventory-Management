import type { NextConfig } from "next";
import { loadEnvConfig } from "@next/env";
import { fileURLToPath } from "node:url";

// Single root .env for the whole monorepo — no per-service .env files. Uses
// Next's own env loader (same one `next dev`/`next start` use internally),
// just pointed at the repo root instead of this app's own directory.
loadEnvConfig(fileURLToPath(new URL("../..", import.meta.url)));

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  // Workspace packages are consumed as raw TS source (see their package.json
  // "main"), so Next needs to run its own resolver/transform over them —
  // otherwise their NodeNext-style ".js" relative imports (which point at
  // ".ts" files) don't resolve under the bundler's default node_modules
  // handling.
  transpilePackages: ["@platform/contracts", "@platform/http-client"],
};

export default nextConfig;
