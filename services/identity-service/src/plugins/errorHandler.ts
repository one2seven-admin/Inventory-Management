import type { FastifyInstance } from "fastify";
import { ZodError } from "zod";
import { ApiError } from "@platform/contracts";

export function registerErrorHandler(app: FastifyInstance) {
  app.setErrorHandler((error, _request, reply) => {
    if (error instanceof ApiError) {
      reply.code(error.statusCode).send(error.toBody());
      return;
    }
    if (error instanceof ZodError) {
      reply.code(400).send({
        error: { code: "VALIDATION_ERROR", message: "Invalid request", details: error.flatten() },
      });
      return;
    }
    app.log.error(error);
    reply.code(500).send({ error: { code: "INTERNAL_ERROR", message: "Unexpected server error" } });
  });
}
