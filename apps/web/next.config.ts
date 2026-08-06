import type { NextConfig } from "next";

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
