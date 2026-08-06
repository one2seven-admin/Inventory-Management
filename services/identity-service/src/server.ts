import "dotenv/config";
import { buildApp } from "./app.js";
import { config } from "./config.js";

const app = buildApp();

app
  .listen({ port: config.port, host: "0.0.0.0" })
  .then(() => app.log.info(`identity-service listening on :${config.port}`))
  .catch((error) => {
    app.log.error(error);
    process.exit(1);
  });
