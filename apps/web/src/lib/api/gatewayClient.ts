import { createHttpClient, type HttpClient } from "@platform/http-client";
import { config } from "../config";

export function getGatewayClient(accessToken?: string | null): HttpClient {
  return createHttpClient({
    baseUrl: `${config.gatewayUrl}/api/v1/`,
    authToken: accessToken ?? undefined,
  });
}
