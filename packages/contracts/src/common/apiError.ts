export interface ApiErrorBody {
  error: {
    code: string;
    message: string;
    details?: unknown;
  };
}

export class ApiError extends Error {
  readonly statusCode: number;
  readonly code: string;
  readonly details?: unknown;

  constructor(statusCode: number, code: string, message: string, details?: unknown) {
    super(message);
    this.name = "ApiError";
    this.statusCode = statusCode;
    this.code = code;
    this.details = details;
  }

  toBody(): ApiErrorBody {
    return { error: { code: this.code, message: this.message, details: this.details } };
  }

  static notFound(message = "Resource not found") {
    return new ApiError(404, "NOT_FOUND", message);
  }

  static badRequest(message: string, details?: unknown) {
    return new ApiError(400, "BAD_REQUEST", message, details);
  }

  static conflict(message: string) {
    return new ApiError(409, "CONFLICT", message);
  }

  static forbidden(message = "You do not have permission to perform this action") {
    return new ApiError(403, "FORBIDDEN", message);
  }

  static unauthorized(message = "Authentication required") {
    return new ApiError(401, "UNAUTHORIZED", message);
  }
}
