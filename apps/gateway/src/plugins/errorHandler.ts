import type { FastifyInstance } from "fastify";
import { ApiError } from "@platform/contracts";

export function registerErrorHandler(app: FastifyInstance) {
  app.setErrorHandler((error, _request, reply) => {
    if (error instanceof ApiError) {
      reply.code(error.statusCode).send(error.toBody());
      return;
    }
    app.log.error(error);
    reply.code(502).send({ error: { code: "BAD_GATEWAY", message: "Upstream request failed" } });
  });
}
