import "./loadEnv.js";
import { buildApp } from "./app.js";
import { config } from "./config.js";
import { startAlertScheduler } from "./alertScheduler.js";

const app = buildApp();

app
  .listen({ port: config.port, host: "0.0.0.0" })
  .then(() => {
    app.log.info(`notifications-service listening on :${config.port}`);
    startAlertScheduler(app.log);
  })
  .catch((error) => {
    app.log.error(error);
    process.exit(1);
  });
